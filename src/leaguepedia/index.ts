import axios from './axios'
import { generateURL } from './generate_url'
import { Field, Item, Parameter, Table } from './types'

export const leaguepedia = {
  axiosInstance: axios,

  async fetch<T extends Table, LeftField extends Field<T>>(
    parameter: Parameter<T, LeftField>,
  ) {
    const url = await generateURL(parameter)
    const res = await axios.get<Item<Field<T>>[]>(url)
    return res.data
  },
}
