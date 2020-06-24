const { getType } = require('./util')

function generateTitleParameter() {
  return `title=Special:CargoExport`
}

function generateTableParameter(table) {
  return `tables=${table}`
}

function generateFieldsParameter(table) {
  const correspondingModulePath = `../module/${table}`
  const module = require(correspondingModulePath)

  // _pageName is default field for all tables
  let fields = 'fields=_pageName=_pageName'
  for (let field of module) {
    fields +=`,${field.field}=${field.field}`
  }

  return fields
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
      whereParameter += where.map(keyword => `_pageName LIKE "%${keyword}%"`).join(' AND ')
      break
    default:
      throw new Error('where must be String or Array')
  }

  console.log(whereParameter)
  return whereParameter
}

function generateJoinOnParameter(joinOn) {
  return `join on=${joinOn}`
}

function generateHavingParameter(having) {
  return (getType(having) === 'String') ? `having=${having}` : ''
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
    generateHavingParameter(having)
  ].join('&')

  return groupByAndHavingParamter
}

function generateItemInOrderByParameter(item) {
  switch (getType(item)) {
    case 'String':
      return `\`${item}\``
    case 'Object':
      const type = item.type === 'desc' ? ' DESC' : ''
      return `\`${item.field}\`${type}`
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
      break;
    case 'Array':
      orderByParameter += orderBy.map(item => generateItemInOrderByParameter(item)).join(',')
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

exports.generateURL = function (table, where, common = {}) {
  const url = 'index.php?' + [
    generateTitleParameter(),
    generateTableParameter(table),
    generateFieldsParameter(table),
    generateWhereParameter(where),
    generateJoinOnParameter(common.joinOn),
    generateGroupByAndHavingParameter(common.groupBy, common.having),
    generateOrderByParameter(common.orderBy),
    generateLimitParameter(common.limit),
    generateOffsetbyParameter(common.offset),
    generateFormatbyParameter(common.format)
  ].filter(str => str).join('&')

  return encodeURI(url)
}