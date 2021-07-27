import axios from './axios'
import { generateURL } from './generate_url'
import { Field, Item, Parameter, Table } from './types'

export const leaguepedia = {
  axiosInstance: axios,

  async fetch<
    T extends Table,
    Fields extends Field<T>,
    LeftField extends Field<T>,
  >(parameter: Parameter<T, Fields, LeftField>) {
    const url = await generateURL(parameter)
    const res = await axios.get<Item<Fields>[]>(url)
    return res.data
  },
}
