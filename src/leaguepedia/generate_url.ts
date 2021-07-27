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

export async function generateURL<T extends Table, LeftField extends Field<T>>({
  tables,
  fields,
  where,
  joinOn,
  groupBy,
  having,
  orderBy = [{ field: `${tables[0]}._pageName` }],
  limit = Number.MAX_SAFE_INTEGER,
  offset = 0,
  format = 'json',
}: Parameter<T, LeftField>) {
  if (!fields) {
    fields = []
    for (const table of tables) {
      fields = fields.concat(fieldMap[table])
    }
  }

  const searchParams = new URLSearchParams(
    removeUndefinedProperty({
      tables,
      fields,
      where,
      'join on': joinOn?.map((item) => `${item.left}=${item.right}`),
      'group by': groupBy,
      having,
      'order by': orderBy.map(
        (item) => `${item.field}${item.desc ? ' DESC' : ''}`,
      ),
      limit: limit.toString(),
      offset: offset.toString(),
      format,
    }),
  )

  return '/wiki/Special:CargoExport?' + searchParams.toString()
}
