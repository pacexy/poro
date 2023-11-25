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

    let dtos = {}

    const operationNodes = [...$('.operation')]
    const endpoints = operationNodes
      .map((node) => {
        const path = $('.path', node).text().trim()
        const method = $('.http_method', node).text().trim().toLowerCase()
        const desc = $('.options', node).text().trim()

        const [returnTypeNode, ...dtoNodes] = [...$('.response_body', node)]
        const returnType = returnTypeNode.data
          ?.trim()
          .replace(/Return value: (\w+)/, '$1')

        dtoNodes.forEach((dtoNode) => {
          dtos = {
            ...dtos,
            ...dtoToType(dtoNode),
          }
        })

        return `'${path}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({
/** ${desc} */
${method}() {
  return limiter.execute${
    returnType ? `<${transformType(returnType)}>` : ''
  }(generalRegion, realPath, path)
  },
}),`
      })
      .join('')

    const content = `// ${apiName.toUpperCase()}
  ${endpoints}
`

    return { content, dtos }
  })
}

export async function main() {
  const allApiNames = await fetchApiNames()
  const apiNames = allApiNames.filter((name) => {
    return !ignoredApiPrefixes.some((prefix) => name.startsWith(prefix))
  })

  return apiNames
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

function dtoToType(element: cheerio.Element) {
  try {
    const typeName = element.firstElementChild.textContent
    const typeDesc = removeRedundantSpace(
      element.firstElementChild.nextSibling.textContent,
    )

    const propertyNodes = Array.from($('table > tbody', element).children())
    const content = propertyNodes
      .map((propertyNode) =>
        Array.from(propertyNode.children).map((child) =>
          removeRedundantSpace(child.textContent),
        ),
      )
      .map(([name, type, desc]) => {
        const property = `${name}: ${transformType(type)}`
        return desc
          ? `/** ${desc} */
${property}`
          : property
      })
      .join('\n')

    const def = `export type ${typeName} = {
  ${content}
}`
    return {
      [typeName]: typeDesc
        ? `/** ${typeDesc} */
${def}`
        : def,
    }
  } catch (err) {
    //
  }
}
