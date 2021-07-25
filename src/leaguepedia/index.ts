import axios from './axios'
import { generateURL } from './generate_url'
import { Field, Parameter, Table } from './types'

export const leaguepedia = {
  axiosInstance: axios,

  async fetch<T extends Table, F extends Field<T>>(parameter: Parameter<T, F>) {
    const url = await generateURL(parameter)
    const res = await axios.get(url)
    return res.data
  },
}
