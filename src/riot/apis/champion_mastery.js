// v4

const { PLATFORM_BASE_URL, CHAMPION_MASTERY } = require('../config')

const axios = require('../axios')
axios.defaults.baseURL = PLATFORM_BASE_URL + CHAMPION_MASTERY

/**
 * CHAMPION-MASTERY-V4
 */
const ChampionMastery = {
  /**
   * Get all champion mastery entries sorted by number of champion points descending
   */
  championMasteries$encryptedSummonerId({ encryptedSummonerId }) {
    return axios.get(`/champion-masteries/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get a champion mastery by player ID and champion ID
   */
  championMastery$encryptedSummonerId_championId({
    encryptedSummonerId,
    championId,
  }) {
    return axios.get(
      `/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${championId}`,
    )
  },
  /**
   * Get a player's total champion mastery score, which is the sum of individual champion mastery levels
   */
  championMasteryScore$encryptedSummonerId({ encryptedSummonerId }) {
    return axios.get(`/scores/by-summoner/${encryptedSummonerId}`)
  },
}

module.exports = ChampionMastery
