import * as cheerio from 'cheerio'
import { isString } from 'lodash'
import { RiotClient } from 'src'

const riot = new RiotClient({
  auth: '',
})
const axios = riot.axiosInstance
const BASE_URL = 'https://developer.riotgames.com'
const ignoredApiPrefixes = ['tft', 'lor', 'val']

export function fetchApiNames() {
  return axios.get(BASE_URL + '/apis').then(({ data }) => {
    const $ = cheerio.load(data)

    const apiList = $('ul.app-nav-bar a').toArray()
    const apiNames = apiList
      .map((a) => {
        if (a.type === 'tag') {
          return a.attribs['api-name']
        }
      })
      .filter(isString)

    return apiNames
  })
}

export function genEndpoints(apiName: string) {
  return axios.get(`${BASE_URL}/api-details/${apiName}`).then(({ data }) => {
    const $ = cheerio.load(data.html)

    const dtoMap = {}

    const operationNodes = $('.operation').toArray()
    const endpoints = operationNodes
      .map((node) => {
        const path = $(node).find('.path').text().trim()
        const method = $(node).find('.http_method').text().trim().toLowerCase()
        const desc = $(node).find('.options').text().trim()

        const [returnTypeNode, ...dtoNodes] = $(node)
          .find('.response_body')
          .toArray()
        const returnType = $(returnTypeNode)
          .text()
          .trim()
          .replace(/Return value: (\w+)/, '$1')

        dtoNodes.forEach((dtoNode) => {
          Object.assign(dtoMap, dtoToType($, dtoNode))
        })

        return `'${path}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({\n/** ${desc} */\n${method}() {\n  return limiter.execute${
          returnType ? `<${transformType(returnType)}>` : ''
        }(generalRegion, realPath, path)\n  },\n}),`
      })
      .join('')

    const content = `
    // #region ${apiName.toUpperCase()}
      ${endpoints}
    // #endregion
      `

    const dtos = `
    // #region ${apiName.toUpperCase()}
      ${Object.values(dtoMap).join('\n\n')}
    // #endregion
    `

    return { content, dtos }
  })
}

export async function main() {
  const allApiNames = await fetchApiNames()
  const apiNames = allApiNames.filter((name) => {
    return !ignoredApiPrefixes.some((prefix) => name.startsWith(prefix))
  })

  // eslint-disable-next-line no-console
  console.log('apiNames', apiNames)

  let content = ''
  let dtos = ''

  for (const apiName of apiNames) {
    // eslint-disable-next-line no-console
    console.log('genEndpoints', apiName)
    const result = await genEndpoints(apiName)
    content += result.content
    dtos += result.dtos
  }

  return { content: `{${content}}`, dtos }
}

// utils
function removeRedundantSpace(str: string) {
  return str.trim().split(' ').filter(Boolean).join(' ')
}

function transformType(type: string) {
  return removeRedundantSpace(
    type
      .replace('int', 'number')
      .replace('long', 'number')
      .replace('double', 'number')
      .replace('String', 'string')
      .replace(/Set\[(\w+)\]/, '$1[]')
      .replace(/List\[(\w+)\]/, '$1[]')
      .replace(/Map\[(.+)\]/, 'Record<$1>'),
  )
}

function dtoToType(
  $: cheerio.Root,
  element: cheerio.Element,
): Record<string, string> | void {
  try {
    const typeName = $(element).find('h5').text()
    if (!typeName) return

    const typeDesc = removeRedundantSpace($(element).find('h5').next().text())

    const propertyNodes = $(element).find('table > tbody').children().toArray()
    const content = propertyNodes
      .map((propertyNode) => {
        const children = $(propertyNode).children().toArray()
        return children.map((child) => removeRedundantSpace($(child).text()))
      })
      .map(([name, type, desc]) => {
        const property = `${name}: ${transformType(type)}`
        return desc ? `/** ${desc} */\n${property}` : property
      })
      .join('\n')

    const def = `export interface ${typeName} {\n  ${content}\n}`
    return {
      [typeName]: typeDesc ? `/** ${typeDesc} */\n${def}` : def,
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}
