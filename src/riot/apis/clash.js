// v1

const axios = require('../axios')
const { PLATFORM_BASE_URL, CLASH } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + CLASH

/**
 * CLASH-V1
 */
const Clash = {
  /**
   * Get players by summoner ID
   */
  players$summonerId({ summonerId }) {
    return axios.get(`/players/by-summoner/${summonerId}`)
  },
  /**
   * Get team by ID
   */
  team$teamId({ teamId }) {
    return axios.get(`/teams/${teamId}`)
  },
  /**
   * Get all active or upcoming tournaments
   */
  tournaments() {
    return axios.get('/tournaments')
  },
  /**
   * Get tournament by team ID
   */
  tournament$teamId({ teamId }) {
    return axios.get(`/tournaments/by-team/${teamId}`)
  },
  /**
   * Get tournament by ID
   */
  tournament$tournamentId({ tournamentId }) {
    return axios.get(`/tournaments/${tournamentId}`)
  },
}

module.exports = Clash
