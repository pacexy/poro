// v4

const axios = require('../axios')
const { PLATFORM_BASE_URL, LEAGUE } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + LEAGUE

/**
 * LEAGUE-V4
 */
const League = {
  /**
   * Get the challenger league for given queue
   */
  challengerLeague$queue({ queue }) {
    return axios.get(`/challengerleagues/by-queue/${queue}`)
  },
  /**
   * Get league entries in all queues for a given summoner ID
   */
  leagueEntries$encryptedSummonerId({ encryptedSummonerId }) {
    return axios.get(`/entries/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get all the league entries
   */
  leagueEntries$queue_tier_division({ queue, tier, division }) {
    return axios.get(`/entries/${queue}/${tier}/${division}`)
  },
  /**
   * Get the grandmaster league of a specific queue
   */
  grandmasterLeague$queue({ queue }) {
    return axios.get(`/grandmasterleagues/by-queue/${queue}`)
  },
  /**
   * Get league with given ID, including inactive entries
   */
  league$leagueId({ leagueId }) {
    return axios.get(`/leagues/${leagueId}`)
  },
  /**
   * Get the master league for given queue
   */
  masterLeague$queue({ queue }) {
    return axios.get(`/masterleagues/by-queue/${queue}`)
  },
}

module.exports = League
