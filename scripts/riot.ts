/* eslint-disable no-console */
import { isString } from 'lodash'
import { RiotClient } from 'src/index'

import {
  createDocument,
  $,
  $$,
  text,
  removeRedundantSpace,
  withComment,
} from './utils'

const riot = new RiotClient({
  auth: '',
})
const axios = riot.axiosInstance
const BASE_URL = 'https://developer.riotgames.com'
const ignoredApiPrefixes = ['tft', 'lor', 'val', 'tournament', 'spectator-tft']

// selectors
const s = {
  PAGE_NAMEs: 'ul.app-nav-bar a', // ACCOUNT-V1
  ENDPOINTs: '.operation', // GET /lol/account/v1/accounts/{puuid}
  ENDPOINT_PATH: '.path', // /lol/account/v1/accounts/{puuid}
  ENDPOINT_METHOD: '.http_method', // GET
  ENDPOINT_DESC: '.options', // Get account by puuid
  ENDPOINT_RETURN: '.response_body:first-of-type', // Return value: AccountDTO
  ENDPOINT_DTOs: '.response_body:not(first-of-type)', // AccountDTO <table>, ...other DTOs
  ENDPOINT_QUERY: 'form .api_block h4', // LeagueEntryQuery
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

const QueryMap: Record<string, string> = {
  '/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}/top':
    'GetTopChampionMasteriesQuery',
  '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': 'LeagueEntryQuery',
  '/lol/league/v4/entries/{queue}/{tier}/{division}': 'LeagueEntryQuery',
  '/lol/challenges/v1/challenges/{challengeId}/leaderboards/by-level/{level}':
    'GetChallengeLeaderboardsQuery',
  '/lol/match/v5/matches/by-puuid/{puuid}/ids': 'MatchIdsQuery',
  '/lol/rso-match/v1/matches/ids': 'RsoMatchIdsQuery',
}

function genEndpoint(el: Element, dtoMap: Record<string, string>) {
  const path = text($(el, s.ENDPOINT_PATH))
  const method = text($(el, s.ENDPOINT_METHOD))?.toLowerCase()
  const desc = text($(el, s.ENDPOINT_DESC))
  const returnType = text($(el, s.ENDPOINT_RETURN))?.replace(
    /Return value: (\w+)/,
    '$1',
  )
  $$(el, s.ENDPOINT_DTOs).forEach((el) => Object.assign(dtoMap, parseDto(el)))
  const hasQuery = $$(el, s.ENDPOINT_QUERY).some((e) =>
    e.textContent?.includes('Query Parameters'),
  )

  const generic = returnType ? `<${transformType(returnType)}>` : ''
  const params = hasQuery ? `query: ${QueryMap[path]}` : ''
  const lastArg = hasQuery ? ', query' : ''
  return [
    `'${path}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({`,
    `  /* ${desc} */`,
    `  ${method}(${params}) {`,
    `    return limiter.execute${generic}(generalRegion, realPath, path${lastArg})`,
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
  // different dto in different page may have the same name, so we use page-specific dtoMap
  const dtoMap = {}
  const endpoints = $$(document, s.ENDPOINTs)
    .map((el) => genEndpoint(el, dtoMap))
    .join('\n')
  console.timeEnd(`gen ${page}`)

  return {
    content: [
      `// #region ${page.toUpperCase()}`, //
      endpoints,
      `// #endregion`,
    ].join('\n'),
    dtos: [
      `// #region ${page.toUpperCase()}`, //
      Object.values(dtoMap).join('\n\n'),
      `// #endregion`,
    ].join('\n'),
  }
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
    content: results.map((r) => r.content).join('\n\n'),
    dtos: results.map((r) => r.dtos).join('\n\n'),
  }
}

function transformType(type: string, name = '') {
  const specialTypeMap: Record<string, string> = {
    queue: 'Queue',
    queueType: 'Queue',
    tier: 'Tier',
    rank: 'Division',
  }
  if (name in specialTypeMap) return specialTypeMap[name]

  let transformed = type
  let previous: string

  do {
    // eslint-disable-next-line prefer-const
    previous = transformed
    transformed = removeRedundantSpace(
      previous
        .replace(/Integer/gi, 'number')
        .replace(/int/gi, 'number')
        .replace(/float/gi, 'number')
        .replace(/long/gi, 'number')
        .replace(/double/gi, 'number')
        .replace(/String/gi, 'string')
        .replace(/Set\[(\w+)\]/g, '$1[]')
        .replace(/List\[(\w+)\]/g, '$1[]')
        .replace(/Map\[(.+?)\]/g, 'Record<$1>'),
    )
  } while (transformed !== previous)

  return transformed
}

function parseDto(el: Element) {
  const name = text($(el, s.DTO_NAME))
  if (!name) return

  const comment = text($(el, s.DTO_NAME)?.nextSibling).replace(/^- /, '')
  const props = $$(el, s.DTO_PROPs)
    .map((propEl) => Array.from(propEl.children).map(text))
    .map(([n, t, c]) => {
      const key = /^\d/.test(n) ? `"${n}"` : n
      return withComment(`${key}: ${transformType(t, n)}`, c)
    })
    .join('\n')
  const value = props ? `{\n${props}\n}` : 'NotMentioned'
  const type = `export type ${name} = ${value}`

  return {
    [name]: withComment(type, comment),
  }
}
