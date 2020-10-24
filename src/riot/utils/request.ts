import axios from '../axios'

function generateGet(baseURL: any) {
  return async function (path: any) {
    const res = await axios.get(`${baseURL}${path}`)
    return res.data
  }
}

function generatePost(baseURL: any) {
  return async function (path: any, config: any) {
    const res = await axios.get(`${baseURL}${path}`, config)
    return res.data
  }
}

function generatePut(baseURL: any) {
  return async function (path: any, config: any) {
    const res = await axios.put(`${baseURL}${path}`, config)
    return res.data
  }
}

export function generateRequestMethods(baseURL: any) {
  return {
    get: generateGet(baseURL),
    post: generatePost(baseURL),
    put: generatePut(baseURL),
  }
}
