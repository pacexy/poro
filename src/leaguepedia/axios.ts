const { LEAGUEPEDIA_BASE_URL } = require('./config')

const axios = require('axios').create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})

module.exports = axios
