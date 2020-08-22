const LEAGUEPEDIA_BASE_URL = 'https://lol.gamepedia.com'

const axios = require('axios').create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})

module.exports = axios
