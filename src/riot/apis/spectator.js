// v4

const axios = require('../axios')
const { PLATFORM_BASE_URL, SPECTATOR } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + SPECTATOR

/**
 * SPECTATOR-V4
 */
const Spectator = {
  /**
   * Get current game information for the given summoner ID
   */
  currentGame$encryptedSummonerId({ encryptedSummonerId }) {
    return axios.get(`/active-games/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get list of featured games
   */
  featuredGames() {
    return axios.get('/featured-games')
  },
}

module.exports = Spectator
