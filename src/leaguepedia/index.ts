import axios from './axios'
import { generateURL } from './generate_url'
import { Parameter, Table } from './types'

export const leaguepedia = {
  axiosInstance: axios,

  async fetch(table: Table, parameter?: Parameter) {
    const url = await generateURL(table, parameter)
    const res = await axios.get(url)
    return res.data
  },
}
