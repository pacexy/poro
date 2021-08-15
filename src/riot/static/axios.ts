import axios from 'axios'

// singleton
export const axiosInstance = axios.create()

export function generateRequestMethods(baseURL: string) {
  return {
    get<T = any>(path: string) {
      return axiosInstance.get<T>(`${baseURL}${path}`)
    },
  }
}
