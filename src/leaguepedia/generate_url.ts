import axios from './axios'
import { Parameter, Table } from './types'

// TODO: interceptor
function fetchFields(table: Table) {
  return axios
    .get<{ cargoqueryautocomplete: string[] }>(
      `/api.php?action=cargoqueryautocomplete&format=json&tables=${table}`,
    )
    .then(({ data }) => data.cargoqueryautocomplete)
    .catch((err) => {
      console.log(table, err)
    })
}

function generateWhereParameter(where?: string) {
  if (where) return `where=${where}`
}

function generateJoinOnParameter(joinOn?: string) {
  if (joinOn) return `join on=${joinOn}`
}

function generateGroupByAndHavingParameter(groupBy?: string, having?: string) {
  let groupByAndHavingParameter = ''

  if (groupBy) {
    groupByAndHavingParameter += `group by=${groupBy}`
    if (having) groupByAndHavingParameter += `&having=${having}`
  }

  return groupByAndHavingParameter
}

function generateOrderByParameter(orderBy?: string) {
  if (orderBy) return `order by=${orderBy}`
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

export async function generateURL(table: Table, parameter: Parameter = {}) {
  async function generateFieldsParameter(fields?: string) {
    let fieldsParameter = 'fields='

    if (fields) {
      fieldsParameter += fields
    } else {
      const fields = await fetchFields(table)
      if (!fields) throw new Error(`${table} - fetch fields failed...`)
      fieldsParameter += fields.join(',')
    }

    return fieldsParameter
  }

  const url =
    '/wiki/Special:CargoExport?' +
    [
      `tables=${table}`,
      await generateFieldsParameter(parameter.fields),
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
