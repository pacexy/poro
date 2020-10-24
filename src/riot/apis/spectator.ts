// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, SPECTATOR } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + SPECTATOR)

/**
 * SPECTATOR-V4
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Spectator'... Remove this comment to see the full error message
const Spectator = {
  /**
   * Get current game information for the given summoner ID
   */
  currentGame$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/active-games/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get list of featured games
   */
  featuredGames() {
    return r.get('/featured-games')
  },
}

module.exports = Spectator
