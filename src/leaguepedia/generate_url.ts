import { URLSearchParams } from 'url'
import { Field, fieldMap, Parameter, Table } from './types'

function removeUndefinedProperty(obj: Record<string, any>) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })

  return obj
}

export async function generateURL<T extends Table, F extends Field<T>>({
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
}: Parameter<T, F>) {
  if (!fields) {
    fields = []
    for (const table of tables) {
      fields.concat(fieldMap[table])
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
