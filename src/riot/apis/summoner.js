// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, SUMMONER } = require('../config')

const r = generateRequestMethods(PLATFORM_BASE_URL + SUMMONER)

/**
 * SUMMONER-V4
 */
const Summoner = {
  /**
   * Get a summoner by account ID
   */
  summoner$encryptedAccountId({ encryptedAccountId }) {
    return r.get(`/summoners/by-account/${encryptedAccountId}`)
  },
  /**
   * Get a summoner by summoner name
   */
  summoner$summonerName({ summonerName }) {
    return r.get(`/summoners/by-name/${summonerName}`)
  },
  /**
   * Get a summoner by PUUID
   */
  summoner$encryptedPUUID({ encryptedPUUID }) {
    return r.get(`/summoners/by-puuid/${encryptedPUUID}`)
  },
  /**
   * Get a summoner by summoner ID
   */
  summoner$encryptedSummonerId({ encryptedSummonerId }) {
    return r.get(`/summoners/${encryptedSummonerId}`)
  },
}

module.exports = Summoner
