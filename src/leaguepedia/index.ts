import axios from 'axios'

import { generateUrl } from './generateUrl'
import {
  Field,
  Item,
  Options,
  Parameter,
  PrefixMetaProperties,
  schemaMap,
  Table,
} from './types'

const LEAGUEPEDIA_BASE_URL = 'https://lol.fandom.com'

export class Cargo<P extends string = ''> {
  private readonly metadataPrefix: string

  constructor({ metadataPrefix }: Options<P> = {}) {
    this.metadataPrefix = metadataPrefix ?? ''
  }

  axiosInstance = axios.create({
    baseURL: LEAGUEPEDIA_BASE_URL,
  })

  private spaceToUnderscore<T extends Record<string, any>>(obj: T) {
    // No index signature with a parameter of type 'string' was found on type '{}'.
    // https://stackoverflow.com/a/66406882/13151903
    const newObj: Record<string, any> = {}
    Object.entries(obj).forEach(([key, value]) => {
      newObj[key.replaceAll(' ', '_')] = value
    })
    return newObj as T
  }

  private convert<T extends Record<string, any>>(obj: T, tables: Table[]) {
    const newObj: Record<string, any> = {}
    const defaultTable = tables[0]
    const schema = schemaMap[defaultTable]

    Object.entries(obj).forEach(([key, value]) => {
      if (!(key in schema)) return
      switch (typeof schema[key as keyof typeof schema]) {
        case 'boolean': {
          // leaguepedia use bit(1) to store boolean
          newObj[key] = typeof value === 'number' ? Boolean(value) : null
          break
        }
        case 'number': {
          const n = schema[key as keyof typeof schema]
            ? parseFloat(value)
            : parseInt(value)
          newObj[key] = isNaN(n) ? null : n
          break
        }
        case 'string': {
          switch (schema[key as keyof typeof schema]) {
            case '': {
              const s = String(value)
              newObj[key] = s === '' ? null : s
              break
            }
            case 'Date':
            case 'Datetime': {
              newObj[key] = value ? new Date(value) : null
            }
          }
          break
        }
        default: {
          newObj[key] = value
        }
      }
    })

    return newObj as T
  }

  private addPrefixToMetadata<T extends Record<string, any>>(obj: T) {
    // No index signature with a parameter of type 'string' was found on type '{}'.
    // https://stackoverflow.com/a/66406882/13151903
    let newObj: Record<string, any> = {}

    if (this.metadataPrefix === '') {
      newObj = obj
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith('_')) {
          newObj[this.metadataPrefix + key] = value
        } else {
          newObj[key] = value
        }
      })
    }

    return newObj as P extends '' ? T : PrefixMetaProperties<T, P>
  }

  async query<
    T extends Table,
    Fields extends Field<T>,
    LeftField extends Field<T>,
  >(parameter: Parameter<T, Fields, LeftField>) {
    const url = await generateUrl(parameter)
    const res = await this.axiosInstance.get<Item<Fields>[]>(url)

    return {
      ...res,
      data: res.data
        // `spaceToUnderscore` should be executed first to guarantee object shape is as same as schema defined in `schemaMap`
        .map(this.spaceToUnderscore.bind(this))
        .map((item) => this.convert(item, parameter.tables))
        .map(this.addPrefixToMetadata.bind(this)),
    }
  }
}
