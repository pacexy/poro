/* eslint-disable no-console */

import { isString } from 'lodash'

import { CargoClient } from '../src/leaguepedia/index'

import { text, $, createDocument, $$, writeSchema } from './utils'

const cargo = new CargoClient()
const axios = cargo.axiosInstance
const BASE_URL = '/wiki/Special:CargoTables'

const s = {
  TABLE_NAMEs: '.cargo-tablelist-tablename',
  TABLE_ROWs: '#mw-content-text > ol > li',
  ROW_NAME: 'strong',
  ROW_TYPE: 'tt',
} as const

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

async function parse(name: string) {
  const { data } = await axios.get(BASE_URL + '/' + name)
  const document = createDocument(data)
  const fieldEls = $$(document, s.TABLE_ROWs)

  return {
    name,
    children: fieldEls.map((el) => {
      const name = text($(el, s.ROW_NAME))
      const type = text($(el, s.ROW_TYPE))
      const isArray = text(el).startsWith(`${name} - List of ${type}`)
      return {
        name,
        type,
        isArray,
        desc: text($(el, 'span')),
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
  return $$(document, s.TABLE_NAMEs).map(text).filter(isString)
}

async function generate() {
  const tables = await fetchTables()
  console.log('tables', tables)

  pre()
  for (const table of tables) {
    const data = await parse(table)
    updateString(transform(data))
    console.log('√', table)
  }
  post()

  writeSchema('./cargo/schema', string)
}

generate()
