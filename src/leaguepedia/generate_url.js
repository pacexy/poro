const { JSDOM } = require('jsdom')

const { LEAGUEPEDIA_CARGO_DECLARE_BASE_URL } = require('./config')
const { getType } = require('./util')

async function fetchFields(table) {
  try {
    const { window } = await JSDOM.fromURL(
      `${LEAGUEPEDIA_CARGO_DECLARE_BASE_URL}${table}`,
    )
    const moduleInCargo = window.document.querySelector('.mw-highlight')
      .textContent
    const capturedGroups = Array.from(
      moduleInCargo.matchAll(/field = .(\w+?).,/g),
    )
    const fields = capturedGroups.map((capturedGroup) => capturedGroup[1])

    return fields
  } catch (e) {
    console.log(table, e)
  }
}

function generateTitleParameter() {
  return 'title=Special:CargoExport'
}

function generateTableParameter(table) {
  return `tables=${table}`
}

async function generateFieldsParameter(table) {
  const fields = await fetchFields(table)

  // _pageName is default field for all tables
  let fieldsParameter = 'fields=_pageName=_pageName'
  for (const field of fields) {
    fieldsParameter += `,${field}=${field}`
  }

  return fieldsParameter
}

function generateWhereParameter(where) {
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
        .map((keyword) => `_pageName LIKE "%${keyword}%"`)
        .join(' AND ')
      break
    default:
      throw new Error('where must be String or Array')
  }

  return whereParameter
}

function generateJoinOnParameter(joinOn) {
  if (!joinOn) return ''

  return `join on=${joinOn}`
}

function generateHavingParameter(having) {
  return getType(having) === 'String' ? `having=${having}` : ''
}

function generateGroupByAndHavingParameter(groupBy, having) {
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

function generateItemInOrderByParameter(item) {
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

function generateOrderByParameter(orderBy) {
  if (!orderBy) return ''

  let orderByParameter = 'order by='

  switch (getType(orderBy)) {
    case 'String':
    case 'Object':
      orderByParameter += generateItemInOrderByParameter(orderBy)
      break
    case 'Array':
      orderByParameter += orderBy
        .map((item) => generateItemInOrderByParameter(item))
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

exports.generateURL = async function (table, parameter = {}) {
  const url =
    'index.php?' +
    [
      generateTitleParameter(),
      generateTableParameter(table),
      await generateFieldsParameter(table),
      generateWhereParameter(parameter.where),
      generateJoinOnParameter(parameter.joinOn),
      generateGroupByAndHavingParameter(parameter.groupBy, parameter.having),
      generateOrderByParameter(parameter.orderBy),
      generateLimitParameter(parameter.limit),
      generateOffsetbyParameter(parameter.offset),
      generateFormatbyParameter(parameter.format),
    ]
      .filter((str) => str)
      .join('&')

  return encodeURI(url)
}
