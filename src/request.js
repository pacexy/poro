const leaguepediaUrl = `https://lol.gamepedia.com`

exports.lp = require('axios').create({
  baseURL: leaguepediaUrl
})