/* eslint-disable no-console */
import { writeFileSync } from 'fs'
import path from 'path'

import { isString } from 'lodash'

import { CargoClient } from '../src/leaguepedia/index'

import { text, $, createDocument, $$ } from './utils'

const cargo = new CargoClient()
const axios = cargo.axiosInstance
const BASE_URL = '/wiki/Special:CargoTables'

interface Data {
  name: string
  children: {
    name: string
    type: string
    isArray: boolean
    desc: string
  }[]
}

let string = ''

function writeToFile() {
  writeFileSync(
    path.join(__dirname, `../schemas/cargo_schema_${Date.now()}.ts`),
    string,
  )
}

async function parse(name: string) {
  const { data } = await axios.get(BASE_URL + '/' + name)
  const document = createDocument(data)
  const fieldElements = $$(document, '#mw-content-text > ul > li')

  return {
    name,
    children: fieldElements.map((fieldElem) => {
      const nameNode = $(fieldElem, 'strong')
      const name = text(nameNode)
      const type = text(nameNode?.nextElementSibling)
      const isArray = text(fieldElem).startsWith(`${name} - List of ${type}`)
      return {
        name,
        type,
        isArray,
        desc: text($(fieldElem, 'span')),
      }
    }),
  }
}

function transform(data: Data) {
  // nothing
  return data
}

function pre() {
  string = `export const schemaMap = {`
}

function post() {
  string += '}'
}

function updateString(data: Data) {
  const map: Record<string, any> = {
    String: "''",
    Text: "''",
    Date: 'new Date()',
    Boolean: false,
    Integer: 0,
    Float: 1,
    Wikitext: "''",
    'Wikitext string': "''",
    Page: "''",
    Datetime: 'new Date()',
  }

  const content = data.children
    .map(({ name, type, isArray }) => {
      return isArray
        ? `${name}: [${map[type]}], // List of ${type}`
        : `${name}: ${map[type]}, // ${type}`
    })
    .join('\n')

  string += `
  ${data.name}: {
    ${content}
    _pageName: '',
    _pageTitle: '',
    _pageNamespace: 0,
    _pageID: 0,
    _ID: 0,
  },
  `
}

export async function fetchTables() {
  const { data } = await axios.get(BASE_URL)
  const document = createDocument(data)
  const cargoTableList = $$(document, '#mw-content-text > ul > li')
  const cargoTableNames = cargoTableList
    .map((tableElem) => tableElem.textContent)
    .filter(isString)

  return cargoTableNames
}

async function generate() {
  const tables = await fetchTables()
  console.log('fetch tables success')

  pre()
  for (const table of tables) {
    const data = await parse(table)
    updateString(transform(data))
    console.log('√', table)
  }
  post()

  writeToFile()
}

generate()
