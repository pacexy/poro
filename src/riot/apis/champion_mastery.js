// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, CHAMPION_MASTERY } = require('./config')

const r = generateRequestMethods(PLATFORM_BASE_URL + CHAMPION_MASTERY)

/**
 * CHAMPION-MASTERY-V4
 */
const ChampionMastery = {
  /**
   * Get all champion mastery entries sorted by number of champion points descending
   */
  championMasteries$encryptedSummonerId({ encryptedSummonerId }) {
    return r.get(`/champion-masteries/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get a champion mastery by player ID and champion ID
   */
  championMastery$encryptedSummonerId_championId({
    encryptedSummonerId,
    championId,
  }) {
    return r.get(
      `/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${championId}`,
    )
  },
  /**
   * Get a player's total champion mastery score, which is the sum of individual champion mastery levels
   */
  championMasteryScore$encryptedSummonerId({ encryptedSummonerId }) {
    return r.get(`/scores/by-summoner/${encryptedSummonerId}`)
  },
}

module.exports = ChampionMastery
