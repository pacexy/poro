// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('axios')
const cheerio = require('cheerio')

const { LEAGUEPEDIA_CARGO_DECLARE_BASE_URL } = require('./config')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getType'.
const { getType } = require('./util')

// TODO: interceptor
// TODO: remove cheerio by writing an element parser
async function fetchFields(table: any) {
  try {
    const res = await axios.get(`${LEAGUEPEDIA_CARGO_DECLARE_BASE_URL}${table}`)
    const $ = cheerio.load(res.data)
    const moduleInCargo = $('.mw-highlight').text()
    const capturedGroups = Array.from(
      moduleInCargo.matchAll(/field = .(\w+?).,/g),
    )
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const fields = capturedGroups.map((capturedGroup) => capturedGroup[1])

    return fields
  } catch (e) {
    console.log(table, e)
  }
}

function generateTitleParameter() {
  return 'title=Special:CargoExport'
}

function generateTableParameter(table: any) {
  return `tables=${table}`
}

async function generateFieldsParameter(table: any) {
  const fields = await fetchFields(table)

  // _pageName is default field for all tables
  let fieldsParameter = 'fields=_pageName=_pageName'
  // FIXME: UnhandledPromiseRejectionWarning: TypeError: fields is not iterable
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  for (const field of fields) {
    fieldsParameter += `,${field}=${field}`
  }

  return fieldsParameter
}

function generateWhereParameter(where: any) {
  if (!where) return ''

  let whereParameter = 'where='
  switch (getType(where)) {
    // SQL query syntax
    case 'String':
      whereParameter += where
      break
    // specify keywords in _pageName
    case 'Array':
      whereParameter += where
        .map((keyword: any) => `_pageName LIKE "%${keyword}%"`)
        .join(' AND ')
      break
    default:
      throw new Error('where must be String or Array')
  }

  return whereParameter
}

function generateJoinOnParameter(joinOn: any) {
  if (!joinOn) return ''

  return `join on=${joinOn}`
}

function generateHavingParameter(having: any) {
  return getType(having) === 'String' ? `having=${having}` : ''
}

function generateGroupByAndHavingParameter(groupBy: any, having: any) {
  if (!groupBy) return ''

  let groupByParameter = 'group by='
  let groupByAndHavingParamter = ''
  switch (getType(groupBy)) {
    case 'String':
      groupByParameter += groupBy
      break
    case 'Array':
      groupByParameter += groupBy.join(',')
      break
    default:
      throw new Error('groupBy must be String or Array')
  }
  groupByAndHavingParamter = [
    groupByParameter,
    generateHavingParameter(having),
  ].join('&')

  return groupByAndHavingParamter
}

function generateItemInOrderByParameter(item: any) {
  switch (getType(item)) {
    case 'String':
      return `\`${item}\``
    case 'Object': {
      const type = item.type === 'desc' ? ' DESC' : ''
      return `\`${item.field}\`${type}`
    }
    default:
  }
}

function generateOrderByParameter(orderBy: any) {
  if (!orderBy) return ''

  let orderByParameter = 'order by='

  switch (getType(orderBy)) {
    case 'String':
    case 'Object':
      orderByParameter += generateItemInOrderByParameter(orderBy)
      break
    case 'Array':
      orderByParameter += orderBy
        .map((item: any) => generateItemInOrderByParameter(item))
        .join(',')
      break
    default:
      throw new Error('orderBy must be String, Object or Array')
  }

  return orderByParameter
}

function generateLimitParameter(limit = Number.MAX_SAFE_INTEGER) {
  return `limit=${limit}`
}

function generateOffsetbyParameter(offset = 0) {
  return `offset=${offset}`
}

function generateFormatbyParameter(format = 'json') {
  return `format=${format}`
}

exports.generateURL = async function (table: any, parameter = {}) {
  const url =
    'index.php?' +
    [
      generateTitleParameter(),
      generateTableParameter(table),
      await generateFieldsParameter(table),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'where' does not exist on type '{}'.
      generateWhereParameter(parameter.where),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'joinOn' does not exist on type '{}'.
      generateJoinOnParameter(parameter.joinOn),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'groupBy' does not exist on type '{}'.
      generateGroupByAndHavingParameter(parameter.groupBy, parameter.having),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderBy' does not exist on type '{}'.
      generateOrderByParameter(parameter.orderBy),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'limit' does not exist on type '{}'.
      generateLimitParameter(parameter.limit),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'offset' does not exist on type '{}'.
      generateOffsetbyParameter(parameter.offset),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'format' does not exist on type '{}'.
      generateFormatbyParameter(parameter.format),
    ]
      .filter((str) => str)
      .join('&')

  return encodeURI(url)
}
