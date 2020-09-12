// v3

const axios = require('../axios')
const { PLATFORM_BASE_URL, LOL_STATUS } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + LOL_STATUS

/**
 * LOL-STATUS-V3
 */
const LolStatus = {
  /**
   * Get League of Legends status for the given shard
   */
  leagueEntries$queue_tier_division() {
    return axios.get('/shard-data')
  },
}

module.exports = LolStatus
