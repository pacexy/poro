// v1

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, CLASH } = require('../config')

const r = generateRequestMethods(PLATFORM_BASE_URL + CLASH)

/**
 * CLASH-V1
 */
const Clash = {
  /**
   * Get players by summoner ID
   */
  players$summonerId({ summonerId }) {
    return r.get(`/players/by-summoner/${summonerId}`)
  },
  /**
   * Get team by ID
   */
  team$teamId({ teamId }) {
    return r.get(`/teams/${teamId}`)
  },
  /**
   * Get all active or upcoming tournaments
   */
  tournaments() {
    return r.get('/tournaments')
  },
  /**
   * Get tournament by team ID
   */
  tournament$teamId({ teamId }) {
    return r.get(`/tournaments/by-team/${teamId}`)
  },
  /**
   * Get tournament by ID
   */
  tournament$tournamentId({ tournamentId }) {
    return r.get(`/tournaments/${tournamentId}`)
  },
}

module.exports = Clash
