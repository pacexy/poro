const { LEAGUEPEDIA_BASE_URL } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('axios').create({
  baseURL: LEAGUEPEDIA_BASE_URL,
})

module.exports = axios
