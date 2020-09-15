const axios = require('../axios')

function generateGet(baseURL) {
  return async function (path) {
    const res = await axios.get(`${baseURL}${path}`)
    return res.data
  }
}

function generatePost(baseURL) {
  return async function (path, config) {
    const res = await axios.get(`${baseURL}${path}`, config)
    return res.data
  }
}

function generatePut(baseURL) {
  return async function (path, config) {
    const res = await axios.put(`${baseURL}${path}`, config)
    return res.data
  }
}

function generateRequestMethods(baseURL) {
  return {
    get: generateGet(baseURL),
    post: generatePost(baseURL),
    put: generatePut(baseURL),
  }
}

module.exports = {
  generateRequestMethods,
}