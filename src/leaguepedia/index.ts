import axios from 'axios'

import { generateUrl } from './generateUrl'
import {
  Field,
  Item,
  Options,
  Parameter,
  PrefixMetaProperties,
  Table,
  UncapitalizeProperties,
} from './types'

const LEAGUEPEDIA_BASE_URL = 'https://lol.fandom.com'

function uncapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export class Cargo<U extends boolean = false, P extends string = ''> {
  private readonly uncapitalize: boolean
  private readonly metadataPrefix: string

  constructor({ uncapitalize, metadataPrefix }: Options<U, P> = {}) {
    this.uncapitalize = uncapitalize ?? false
    this.metadataPrefix = metadataPrefix ?? ''
  }

  axiosInstance = axios.create({
    baseURL: LEAGUEPEDIA_BASE_URL,
  })

  private uncapitalizeProperties<T extends Record<string, any>>(obj: T) {
    // No index signature with a parameter of type 'string' was found on type '{}'.
    // https://stackoverflow.com/a/66406882/13151903
    let newObj: Record<string, any> = {}

    if (!this.uncapitalize) {
      newObj = obj
    } else {
      Object.entries(obj).forEach(([key, value]) => {
        newObj[uncapitalize(key)] = value
      })
    }

    return newObj as U extends false ? T : UncapitalizeProperties<T>
  }

  private addPrefixToMetadata<T extends Record<string, any>>(obj: T) {
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
        .map(this.uncapitalizeProperties.bind(this))
        .map(this.addPrefixToMetadata.bind(this)),
    }
  }
}
