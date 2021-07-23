import { URLSearchParams } from 'url'
import axios from './axios'
import { Field, Parameter, Table } from './types'

// TODO: interceptor
function fetchFields(table: Table) {
  return axios
    .get<{ cargoqueryautocomplete: Field[] }>(
      `/api.php?action=cargoqueryautocomplete&format=json&tables=${table}`,
    )
    .then(({ data }) => data.cargoqueryautocomplete)
    .catch((err) => {
      console.log(table, err)
      throw err
    })
}

function removeUndefinedProperty(obj: Record<string, any>) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}

export async function generateURL({
  tables,
  fields,
  where,
  joinOn,
  groupBy,
  having,
  orderBy,
  limit = Number.MAX_SAFE_INTEGER,
  offset = 0,
  format = 'json',
}: Parameter) {
  if (!fields) {
    fields = []
    for (const table of tables) {
      fields.concat(await fetchFields(table))
    }
  }

  const searchParams = new URLSearchParams(
    removeUndefinedProperty({
      tables,
      fields,
      where,
      'join on': joinOn,
      'group by': groupBy,
      having,
      'order by': orderBy?.map(
        (item) => `${item.field}${item.desc ? ' DESC' : ''}`,
      ),
      limit: limit.toString(),
      offset: offset.toString(),
      format,
    }),
  )

  const url = '/wiki/Special:CargoExport?' + searchParams.toString()
  return encodeURIComponent(url)
}
