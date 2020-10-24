// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, SPECTATOR } = require('./config')

const r = generateRequestMethods(PLATFORM_BASE_URL + SPECTATOR)

/**
 * SPECTATOR-V4
 */
const Spectator = {
  /**
   * Get current game information for the given summoner ID
   */
  currentGame$encryptedSummonerId({ encryptedSummonerId }) {
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
