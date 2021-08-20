import axios from 'axios'

import { generateUrl } from './generateUrl'
import { Field, Item, Parameter, Table } from './types'

const LEAGUEPEDIA_BASE_URL = 'https://lol.fandom.com'

const axiosInstance = axios.create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})

export async function cargoQuery<
  T extends Table,
  Fields extends Field<T>,
  LeftField extends Field<T>,
>(parameter: Parameter<T, Fields, LeftField>) {
  const url = await generateUrl(parameter)
  const res = await axiosInstance.get<Item<Fields>[]>(url)
  return res.data
}

cargoQuery.axiosInstance = axiosInstance
