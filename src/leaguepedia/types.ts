// THIS WILL BE AUTO-GENERATED.
export type Table = string

// THIS WILL BE AUTO-GENERATED.
interface FieldMap {
  [key: string]: string
}

// THIS WILL BE AUTO-GENERATED.
export const fieldMap: {
  [key: string]: string[]
} = {}

export type Field<T extends Table> = FieldMap[T]

export interface JoinOn<T extends Table, LeftField extends Field<T>> {
  // use type argument inference
  left: LeftField
  // infer left table with template literal type
  right: LeftField extends `${infer LeftTable}.${string}`
    ? Field<Exclude<T, LeftTable>>
    : never
}

export interface OrderBy<T extends Table> {
  field: Field<T>
  desc?: boolean
}

export interface Parameter<T extends Table, F extends Field<T>> {
  tables: T[]
  fields?: Field<T>[]
  where?: string
  joinOn?: JoinOn<T, F>[]
  groupBy?: Field<T>[]
  having?: string
  orderBy?: OrderBy<T>[]
  limit?: number
  offset?: number
  format?: string
}
