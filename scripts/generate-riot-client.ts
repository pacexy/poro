/* eslint-disable no-console */
import { JSDOM } from 'jsdom'
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
    console.time('parse html')
    const jsdom = new JSDOM(data)
    const document = jsdom.window.document
    console.timeEnd('parse html')

    console.time('parse api names')
    const apiList = Array.from(document.querySelectorAll('ul.app-nav-bar a'))
    const apiNames = apiList
      .map((a) => a.getAttribute('api-name'))
      .filter(isString)
    console.timeEnd('parse api names')

    return apiNames
  })
}

export function genEndpoints(apiName: string) {
  return axios.get(`${BASE_URL}/api-details/${apiName}`).then(({ data }) => {
    console.time('parse html')
    const jsdom = new JSDOM(data.html)
    const document = jsdom.window.document
    console.timeEnd('parse html')

    console.time('parse endpoints')
    const dtoMap = {}

    const operationNodes = Array.from(document.querySelectorAll('.operation'))
    const endpoints = operationNodes
      .map((node) => {
        const path = node.querySelector('.path')?.textContent?.trim()
        const method = node
          .querySelector('.http_method')
          ?.textContent?.trim()
          .toLowerCase()
        const desc = node.querySelector('.options')?.textContent?.trim()

        const responseBodies = Array.from(
          node.querySelectorAll('.response_body'),
        )
        const returnTypeNode = responseBodies.shift()
        const returnType = returnTypeNode?.textContent
          ?.trim()
          .replace(/Return value: (\w+)/, '$1')

        responseBodies.forEach((dtoNode) => {
          Object.assign(dtoMap, dtoToType(dtoNode))
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
    console.timeEnd('parse endpoints')

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
function removeRedundantSpace(str?: string | null) {
  if (!str) return ''
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

function dtoToType(element: Element) {
  try {
    const typeName = element.querySelector('h5')?.textContent
    if (!typeName) return

    const typeDesc = removeRedundantSpace(
      element.querySelector('h5')?.nextElementSibling?.textContent,
    )

    const propertyNodes = Array.from(
      element.querySelectorAll('table > tbody > tr'),
    )
    const content = propertyNodes
      .map((propertyNode) => {
        const children = Array.from(propertyNode.children)
        return children.map((child) => removeRedundantSpace(child.textContent))
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
