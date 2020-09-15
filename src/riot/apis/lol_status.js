// v3

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, LOL_STATUS } = require('../config')

const r = generateRequestMethods(PLATFORM_BASE_URL + LOL_STATUS)

/**
 * LOL-STATUS-V3
 */
const LolStatus = {
  /**
   * Get League of Legends status for the given shard
   */
  leagueEntries$queue_tier_division() {
    return r.get('/shard-data')
  },
}

module.exports = LolStatus
