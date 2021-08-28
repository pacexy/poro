#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

import { Project } from 'ts-morph'
import ts from 'typescript'

import { fetchTables } from '../scripts/cargoSchemaGenerator'
import { Cargo } from '../src'

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

const fieldMapTypeMembers: ts.PropertySignature[] = []
const fieldMapObjectProperties: ts.PropertyAssignment[] = []

const cargo = new Cargo()

function generateFields(table: string) {
  return cargo.axiosInstance
    .get<{ cargoqueryautocomplete: string[] }>(
      `/api.php?action=cargoqueryautocomplete&format=json&tables=${table}`,
    )
    .then(({ data }) => {
      const fields = data.cargoqueryautocomplete
      fieldMapTypeMembers.push(
        ts.factory.createPropertySignature(
          [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
          ts.factory.createIdentifier(table),
          undefined,
          ts.factory.createTypeOperatorNode(
            ts.SyntaxKind.ReadonlyKeyword,
            ts.factory.createTupleTypeNode(
              fields.map((field) =>
                ts.factory.createLiteralTypeNode(
                  ts.factory.createStringLiteral(field),
                ),
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
  // eslint-disable-next-line no-console
  console.log('Generating leaguepedia field...')

  const tables = await fetchTables()

  for (const [i, table] of tables.entries()) {
    await generateFields(table)
    // eslint-disable-next-line no-console
    console.log(i, table, 'completed.')
  }

  dtsSourceFile.transform((traversal) => {
    const node = traversal.visitChildren()

    if (ts.isVariableStatement(node)) {
      const [variableDeclarationNode] = node.declarationList.declarations
      const variableName = variableDeclarationNode.name

      if (
        ts.isIdentifier(variableName) &&
        variableName.escapedText === 'fieldMap'
      ) {
        return ts.factory.updateVariableStatement(
          node,
          node.modifiers,
          ts.factory.updateVariableDeclarationList(node.declarationList, [
            ts.factory.updateVariableDeclaration(
              variableDeclarationNode,
              variableName,
              undefined,
              ts.factory.createTypeLiteralNode(fieldMapTypeMembers),
              undefined,
            ),
          ]),
        )
      }
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
