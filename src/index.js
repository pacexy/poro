(function(){
  const fs = require('fs')
  const path = require('path')

  const { lp } = require('./request')
  const { generateURL } = require('./leaguepedia')
  const t = require('./table_name')

  class Poro {
    constructor() {
    }
    
    _fetch(table, where, common) {
      lp.get(generateURL(table, where, common))
      .then(res => {
        fs.writeFileSync(
          path.resolve(__dirname, `../test/${table}.json`),
          JSON.stringify(res.data, null, 2)
        )
      })
      .catch((err) => {
        console.log(err);
      })
    }

    fetchMatchSchedule(where, common) {
      return this._fetch(t.MATCH_SCHEDULE, where, common)
    }
  }

  module.exports = Poro
})()
