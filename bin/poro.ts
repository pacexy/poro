#!/usr/bin/env node

import * as cheerio from 'cheerio'
import { isString } from 'lodash'
import ts from 'typescript'
import path from 'path'
import fs from 'fs'
import { Project } from 'ts-morph'

import axios from '../src/leaguepedia/axios'

const DIR_PATH = path.join(__dirname, '../src/leaguepedia')
const DTS_FILE_PATH = path.join(DIR_PATH, 'types.d.ts')
const JS_FILE_PATH = path.join(DIR_PATH, 'types.js')

const project = new Project()

const dtsSourceFile = project.createSourceFile(
  'types.d.ts',
  fs.readFileSync(DTS_FILE_PATH).toString(),
)
const jsSourceFile = project.createSourceFile(
  'types.js',
  fs.readFileSync(JS_FILE_PATH).toString(),
)

let tableUnionTypes: ts.LiteralTypeNode[]
const fieldMapInterfaceMembers: ts.PropertySignature[] = []
const fieldMapObjectProperties: ts.PropertyAssignment[] = []

function generateTables() {
  return axios.get('/wiki/Special:CargoTables').then(({ data }) => {
    const $ = cheerio.load(data)

    const cargoTableList = $('#mw-content-text > ul').children().toArray()
    const cargoTableNames = cargoTableList
      .map((tableElem) => {
        if (tableElem.type === 'tag') {
          const firstChild = tableElem.firstChild
          if (firstChild?.type === 'text') {
            return firstChild.data?.split(' ')[0]
          }
        }
      })
      .filter(isString)

    tableUnionTypes = cargoTableNames.map((name) =>
      ts.factory.createLiteralTypeNode(ts.factory.createStringLiteral(name)),
    )

    return cargoTableNames
  })
}

function generateFields(table: string) {
  return axios
    .get<{ cargoqueryautocomplete: string[] }>(
      `/api.php?action=cargoqueryautocomplete&format=json&tables=${table}`,
    )
    .then(({ data }) => {
      const fields = data.cargoqueryautocomplete
      fieldMapInterfaceMembers.push(
        ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(table),
          undefined,
          ts.factory.createUnionTypeNode(
            fields.map((field) =>
              ts.factory.createLiteralTypeNode(
                ts.factory.createStringLiteral(field),
              ),
            ),
          ),
        ),
      )
      fieldMapObjectProperties.push(
        ts.factory.createPropertyAssignment(
          ts.factory.createIdentifier(table),
          ts.factory.createArrayLiteralExpression(
            fields.map((field) => ts.factory.createStringLiteral(field)),
            false,
          ),
        ),
      )
    })
}

async function generate() {
  console.log('Generating leaguepedia schema...')

  const tables = await generateTables()

  for (const [i, table] of tables.entries()) {
    await generateFields(table)
    console.log(i, table, 'completed.')
  }

  dtsSourceFile.transform((traversal) => {
    const node = traversal.visitChildren()
    if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === 'Table') {
      return ts.factory.updateTypeAliasDeclaration(
        node,
        undefined,
        undefined,
        node.name,
        undefined,
        ts.factory.createUnionTypeNode(tableUnionTypes),
      )
    }

    if (
      ts.isInterfaceDeclaration(node) &&
      node.name.escapedText === 'FieldMap'
    ) {
      return ts.factory.updateInterfaceDeclaration(
        node,
        undefined,
        undefined,
        node.name,
        undefined,
        undefined,
        fieldMapInterfaceMembers,
      )
    }
    return node
  })

  jsSourceFile.transform((traversal) => {
    const node = traversal.visitChildren()
    if (
      ts.isExpressionStatement(node) &&
      node.getFullText().includes('fieldMap')
    ) {
      const binaryExpressionNode = node
        .getChildren()
        .find(ts.isBinaryExpression)
      if (
        binaryExpressionNode &&
        ts.isObjectLiteralExpression(binaryExpressionNode.right)
      ) {
        return ts.factory.updateExpressionStatement(
          node,
          ts.factory.updateBinaryExpression(
            binaryExpressionNode,
            binaryExpressionNode.left,
            binaryExpressionNode.operatorToken,
            ts.factory.updateObjectLiteralExpression(
              binaryExpressionNode.right,
              fieldMapObjectProperties,
            ),
          ),
        )
      }
    }
    return node
  })

  fs.writeFileSync(DTS_FILE_PATH, dtsSourceFile.getFullText())
  fs.writeFileSync(JS_FILE_PATH, jsSourceFile.getFullText())
}

generate()
