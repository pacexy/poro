import { writeFileSync } from 'fs'
import path from 'path'

import * as cheerio from 'cheerio'
import { isString } from 'lodash'

import { Cargo } from '../src/leaguepedia/index'

const cargo = new Cargo()
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

function parse(name: string) {
  return axios.get(BASE_URL + '/' + name).then(({ data }) => {
    const $ = cheerio.load(data)
    const fieldElements = $('#mw-content-text > ul').children().toArray()

    return {
      name,
      children: fieldElements.map((fieldElem) => {
        const nameNode = $('strong', fieldElem)
        const name = nameNode.text()
        const type = nameNode.next().text()
        const isArray = nameNode
          .parent()
          .text()
          .startsWith(`${name} - List of ${type}`)
        return {
          name,
          type,
          isArray,
          desc: $('span', fieldElem).text(),
        }
      }),
    }
  })
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

export function fetchTables() {
  return axios.get(BASE_URL).then(({ data }) => {
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

    return cargoTableNames
  })
}

async function generate() {
  const tables = await fetchTables()
  // eslint-disable-next-line no-console
  console.log('fetch tables success')

  pre()
  for (const table of tables) {
    const data = await parse(table)
    updateString(transform(data))
    // eslint-disable-next-line no-console
    console.log('√', table)
  }
  post()

  writeToFile()
}

generate()
