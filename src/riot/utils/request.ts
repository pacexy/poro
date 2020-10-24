// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('../axios')

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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
function generateRequestMethods(baseURL: any) {
  return {
    get: generateGet(baseURL),
    post: generatePost(baseURL),
    put: generatePut(baseURL),
  }
}

module.exports = {
  generateRequestMethods,
}
