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
const dtoMap = {}

export async function fetchApiNames() {
  const { data } = await axios.get(BASE_URL + '/apis')
  console.time('parse html')
  const jsdom = new JSDOM(data)
  const document = jsdom.window.document
  console.timeEnd('parse html')

  console.time('parse api names')
  const apiNames = $$(document, 'ul.app-nav-bar a')
    .map((a) => a.getAttribute('api-name'))
    .filter(isString)
    .filter((n) => !ignoredApiPrefixes.some((p) => n.startsWith(p)))
  console.timeEnd('parse api names')

  return apiNames
}

function genEndpoint(el: Element) {
  const path = text($(el, '.path'))
  const method = text($(el, '.http_method'))?.toLowerCase()
  const desc = text($(el, '.options'))

  const [returnTypeEl, ...dtoEls] = $$(el, '.response_body')
  const returnType = text(returnTypeEl)?.replace(/Return value: (\w+)/, '$1')
  dtoEls.forEach((el) => Object.assign(dtoMap, dtoToType(el)))

  const generic = returnType ? `<${transformType(returnType)}>` : ''
  return [
    `'${path}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({`,
    `  /* ${desc} */`,
    `  ${method}() {`,
    `    return limiter.execute${generic}(generalRegion, realPath, path)`,
    `  },`,
    `}),`,
  ].join('\n')
}

export async function genEndpoints(apiName: string) {
  const { data } = await axios.get(`${BASE_URL}/api-details/${apiName}`)
  console.time('parse html')
  const jsdom = new JSDOM(data.html)
  const document = jsdom.window.document
  console.timeEnd('parse html')

  console.time('parse endpoints')
  const endpoints = $$(document, '.operation')
    .map((el) => genEndpoint(el))
    .join('\n')

  const content = [
    `// #region ${apiName.toUpperCase()}`,
    endpoints,
    `// #endregion`,
  ].join('\n')
  console.timeEnd('parse endpoints')

  return content
}

export async function genApis() {
  const apiNames = await fetchApiNames()
  console.log('apiNames', apiNames)

  let content = ''
  for (const apiName of apiNames) {
    console.log('genEndpoints', apiName)
    const result = await genEndpoints(apiName)
    content += result
  }

  return { content, dtos: Object.values(dtoMap).join('\n') }
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

function dtoToType(el: Element) {
  try {
    const typeName = text($(el, 'h5'))
    if (!typeName) return

    const content = $$(el, 'table > tbody > tr')
      .map((propEl) => Array.from(propEl.children).map(text))
      .map(([n, t, c]) => withComment(`${n}: ${transformType(t)}`, c))
      .join('\n')

    const type = [
      `export interface ${typeName} {`, //
      content,
      `}`,
    ].join('\n')

    const comment = text($(el, 'h5')?.nextElementSibling)

    return {
      [typeName]: withComment(type, comment),
    }
  } catch (err) {
    console.error(err)
  }
}

// utils
function removeRedundantSpace(str?: string | null) {
  if (!str) return ''
  return str.trim().split(' ').filter(Boolean).join(' ')
}

function text(el?: Element | null) {
  return removeRedundantSpace(el?.textContent)
}

function $(el: Element | Document, selector: string) {
  return el.querySelector(selector)
}

function $$(el: Element | Document, selector: string) {
  return Array.from(el.querySelectorAll(selector))
}

function withComment(content: string, comment?: string) {
  if (!comment) return content
  return [
    `/* ${comment} */`, //
    content,
  ].join('\n')
}
