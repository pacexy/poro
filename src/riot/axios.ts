// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('axios').create({})

module.exports = axios
