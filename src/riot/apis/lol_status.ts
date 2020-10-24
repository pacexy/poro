// v3

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, LOL_STATUS } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + LOL_STATUS)

/**
 * LOL-STATUS-V3
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'LolStatus'... Remove this comment to see the full error message
const LolStatus = {
  /**
   * Get League of Legends status for the given shard
   */
  leagueEntries$queue_tier_division() {
    return r.get('/shard-data')
  },
}

module.exports = LolStatus
