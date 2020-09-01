(function () {
  const LeaguePediaMixin = require('./leaguepedia')

  class Poro {}
  module.exports = LeaguePediaMixin(Poro)
})()
