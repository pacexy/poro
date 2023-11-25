/* eslint-disable no-console */
import { JSDOM } from 'jsdom'
import { isString } from 'lodash'
import { RiotClient } from 'src/index'
const riot = new RiotClient({
  auth: '',
})
const axios = riot.axiosInstance
const BASE_URL = 'https://developer.riotgames.com'
const ignoredApiPrefixes = ['tft', 'lor', 'val', 'tournament']

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
      .filter((name) => {
        return !ignoredApiPrefixes.some((prefix) => name.startsWith(prefix))
      })
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

    const endpoints = Array.from(document.querySelectorAll('.operation'))
      .map((node) => {
        const path = node.querySelector('.path')?.textContent?.trim()
        const method = node
          .querySelector('.http_method')
          ?.textContent?.trim()
          .toLowerCase()
        const desc = node.querySelector('.options')?.textContent?.trim()

        const [returnTypeNode, ...dtoNodes] = Array.from(
          node.querySelectorAll('.response_body'),
        )
        const returnType = returnTypeNode?.textContent
          ?.trim()
          .replace(/Return value: (\w+)/, '$1')

        dtoNodes.forEach((dtoNode) => {
          Object.assign(dtoMap, dtoToType(dtoNode))
        })

        const generic = returnType ? `<${transformType(returnType)}>` : ''
        return [
          `'${path}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({`,
          `  /** ${desc} */`,
          `  ${method}() {`,
          `    return limiter.execute${generic}(generalRegion, realPath, path)`,
          `  },`,
          `}),`,
        ].join('\n')
      })
      .join('\n')

    const content = [
      `// #region ${apiName.toUpperCase()}`,
      endpoints,
      `// #endregion`,
    ].join('\n')

    const dtos = [
      `// #region ${apiName.toUpperCase()}`,
      Object.values(dtoMap).join('\n\n'),
      `// #endregion`,
    ].join('\n')

    console.timeEnd('parse endpoints')

    return { content, dtos }
  })
}

export async function genApis() {
  const apiNames = await fetchApiNames()
  console.log('apiNames', apiNames)

  let content = ''
  let dtos = ''

  for (const apiName of apiNames) {
    console.log('genEndpoints', apiName)
    const result = await genEndpoints(apiName)
    content += result.content
    dtos += result.dtos
  }

  return { content, dtos }
}

// utils
function removeRedundantSpace(str?: string | null) {
  if (!str) return ''
  return str.trim().split(' ').filter(Boolean).join(' ')
}

function transformType(type: string) {
  let transformed = type
  let previous: string

  do {
    // eslint-disable-next-line prefer-const
    previous = transformed
    transformed = removeRedundantSpace(
      previous
        .replace(/int/g, 'number')
        .replace(/long/g, 'number')
        .replace(/double/g, 'number')
        .replace(/String/g, 'string')
        .replace(/Set\[(\w+)\]/g, '$1[]')
        .replace(/List\[(\w+)\]/g, '$1[]')
        .replace(/Map\[(.+?)\]/g, 'Record<$1>'),
    )
  } while (transformed !== previous)

  return transformed
}

function dtoToType(element: Element) {
  try {
    const typeName = element.querySelector('h5')?.textContent
    if (!typeName) return

    const propertyNodes = Array.from(
      element.querySelectorAll('table > tbody > tr'),
    )
    const content = propertyNodes
      .map((propertyNode) => {
        const children = Array.from(propertyNode.children)
        return children.map((child) => removeRedundantSpace(child.textContent))
      })
      .map(([name, type, comment]) => {
        const property = `${name}: ${transformType(type)}`
        return withComment(property, comment)
      })
      .join('\n')

    const type = [
      `export interface ${typeName} {`, //
      content,
      `}`,
    ].join('\n')

    const comment = removeRedundantSpace(
      element.querySelector('h5')?.nextElementSibling?.textContent,
    )

    return {
      [typeName]: withComment(type, comment),
    }
  } catch (err) {
    console.error(err)
  }
}

function withComment(content: string, comment?: string) {
  if (!comment) return content
  return [
    `/** ${comment} */`, //
    content,
  ].join('\n')
}
