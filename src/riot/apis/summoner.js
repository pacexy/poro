// v4

const axios = require('../axios')
const { PLATFORM_BASE_URL, SUMMONER } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + SUMMONER

/**
 * SUMMONER-V4
 */
const Summoner = {
  /**
   * Get a summoner by account ID
   */
  summoner$encryptedAccountId({ encryptedAccountId }) {
    return axios.get(`/summoners/by-account/${encryptedAccountId}`)
  },
  /**
   * Get a summoner by summoner name
   */
  summoner$summonerName({ summonerName }) {
    return axios.get(`/summoners/by-name/${summonerName}`)
  },
  /**
   * Get a summoner by PUUID
   */
  summoner$encryptedPUUID({ encryptedPUUID }) {
    return axios.get(`/summoners/by-puuid/${encryptedPUUID}`)
  },
  /**
   * Get a summoner by summoner ID
   */
  summoner$encryptedSummonerId({ encryptedSummonerId }) {
    return axios.get(`/summoners/${encryptedSummonerId}`)
  },
}

module.exports = Summoner