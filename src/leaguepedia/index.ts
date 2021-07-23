import axios from './axios'
import { generateURL } from './generate_url'
import { Parameter } from './types'

export const leaguepedia = {
  axiosInstance: axios,

  async fetch(parameter: Parameter) {
    const url = await generateURL(parameter)
    const res = await axios.get(url)
    return res.data
  },
}
