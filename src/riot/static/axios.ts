import _axios from 'axios'

// singleton
export const axios = _axios.create()

export function generateRequestMethods(baseURL: string) {
  return {
    get<T = any>(path: string) {
      return axios.get<T>(`${baseURL}${path}`)
    },
  }
}
