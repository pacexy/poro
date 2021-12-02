import type { schemaMap } from './schema'

export type SchemaMap = typeof schemaMap
export type Table = keyof SchemaMap

export interface Options<P> {
  metadataPrefix?: P
}

export type PrefixMetadata<S, P extends string> = S extends `_${infer Name}`
  ? `${P}_${Name}`
  : S

export type PrefixMetaProperties<O, P extends string> = {
  // https://github.com/sindresorhus/type-fest/blob/6de66eb8c26cd37adda7213cdbfb5e8246af8328/source/camel-case.d.ts#L47
  [K in keyof O as PrefixMetadata<K, P>]: O[K]
}

export type Field<T> = T extends Table
  ? // Type 'keyof T' does not satisfy the constraint 'string'.
    // https://github.com/microsoft/TypeScript/issues/25260#issuecomment-548837595
    `${T}.${Extract<keyof SchemaMap[T], string>}`
  : never

type ToFieldName<F> = F extends `${Table}.${infer FieldName}`
  ? FieldName
  : never
type ToFieldType<F, K> = F extends `${infer T}.${string}`
  ? T extends Table
    ? K extends keyof SchemaMap[T]
      ? SchemaMap[T][K]
      : never
    : never
  : never

export type Item<F> = {
  [K in ToFieldName<F>]: ToFieldType<F, K>
}

export type JoinOn<
  T extends Table,
  LeftField extends Field<T>,
  // infer left table with template literal type
> = LeftField extends `${infer LeftTable}.${string}`
  ? {
      // use type argument inference
      left: LeftField
      right: Field<Exclude<T, LeftTable>>
    }
  : never

export interface OrderBy<T extends Table> {
  field: Field<T>
  desc?: boolean
}

export interface Parameter<
  T extends Table,
  Fields extends Field<T>,
  LeftField extends Field<T>,
> {
  tables: T[]
  fields?: Fields[]
  where?: string
  joinOn?: JoinOn<T, LeftField>[]
  groupBy?: Field<T>[]
  having?: string
  orderBy?: OrderBy<T>[]
  limit?: number
  offset?: number
  format?: string
}
