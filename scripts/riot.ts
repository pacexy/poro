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

// selectors
const s = {
  PAGE_NAMEs: 'ul.app-nav-bar a', // ACCOUNT-V1
  ENDPOINTs: '.operation', // GET /lol/account/v1/accounts/{puuid}
  ENDPOINT_PATH: '.path', // /lol/account/v1/accounts/{puuid}
  ENDPOINT_METHOD: '.http_method', // GET
  ENDPOINT_DESC: '.options', // Get account by puuid
  ENDPOINT_RETURN: '.response_body:first-of-type', // Return value: AccountDTO
  ENDPOINT_DTOs: '.response_body:not(first-of-type)', // AccountDTO <table>, ...other DTOs
  DTO_NAME: 'h5', // AccountDTO
  DTO_PROPs: 'table > tbody > tr', // puuid string PUUID
  DTO_COMMENT: '', // - represents a summoner (text node, so not selectable)
}

export async function fetchPageNames() {
  console.time('fetch page names')
  const { data } = await axios.get(BASE_URL + '/apis')
  const document = createDocument(data)
  console.time('fetch page names')

  return $$(document, s.PAGE_NAMEs)
    .map((a) => a.getAttribute('api-name'))
    .filter(isString)
    .filter((n) => !ignoredApiPrefixes.some((p) => n.startsWith(p)))
}

function genEndpoint(el: Element) {
  const path = text($(el, s.ENDPOINT_PATH))
  const method = text($(el, s.ENDPOINT_METHOD))?.toLowerCase()
  const desc = text($(el, s.ENDPOINT_DESC))
  const returnType = text($(el, s.ENDPOINT_RETURN))?.replace(
    /Return value: (\w+)/,
    '$1',
  )
  $$(el, s.ENDPOINT_DTOs).forEach((el) => Object.assign(dtoMap, dtoToType(el)))

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

async function fetchPageDocument(page: string) {
  console.time(`fetch ${page}`)
  const { data } = await axios.get(BASE_URL + `/api-details/${page}`)
  return console.timeEnd(`fetch ${page}`), createDocument(data.html)
}

async function genEndpointsInPage(document: Document, page: string) {
  console.time(`gen ${page}`)
  const endpoints = $$(document, s.ENDPOINTs)
    .map((el) => genEndpoint(el))
    .join('\n')
  console.timeEnd(`gen ${page}`)

  return [
    `// #region ${page.toUpperCase()}`, //
    endpoints,
    `// #endregion`,
  ].join('\n')
}

export async function genEndpoints() {
  const pages = await fetchPageNames()
  console.log('pages', pages)
  // fetch and parse document in parallel
  const documents = await Promise.all(pages.map(fetchPageDocument))
  const results = []
  // execute in sequence to ensure DTOs are generated in order
  for (const [i, page] of pages.entries()) {
    results.push(await genEndpointsInPage(documents[i], page))
  }
  return {
    content: results.join('\n\n'),
    dtos: Object.values(dtoMap).join('\n'),
  }
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
  const name = text($(el, s.DTO_NAME))
  if (!name) return

  const comment = text($(el, s.DTO_NAME)?.nextSibling)
  const props = $$(el, s.DTO_PROPs)
    .map((propEl) => Array.from(propEl.children).map(text))
    .map(([n, t, c]) => withComment(`${n}: ${transformType(t)}`, c))
    .join('\n')
  const type = [
    `export interface ${name} {`, //
    props,
    `}`,
  ].join('\n')

  return {
    [name]: withComment(type, comment),
  }
}

// utils
function createDocument(html: string) {
  const jsdom = new JSDOM(html)
  return jsdom.window.document
}

function removeRedundantSpace(str?: string | null) {
  if (!str) return ''
  return str.trim().split(' ').filter(Boolean).join(' ')
}

function text(node?: Node | null) {
  return removeRedundantSpace(node?.textContent)
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
