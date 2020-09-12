// v4

const axios = require('../axios')
const { PLATFORM_BASE_URL, MATCH } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + MATCH

/**
 * MATCH-V4
 */
const Match = {
  /**
   * Get match by match ID
   */
  match$matchId({ matchId }) {
    return axios.get(`/matches/${matchId}`)
  },
  /**
   * Get matchlist for games played on given account ID and
   * platform ID and filtered using given filter parameters, if any
   */
  // TODO: WIP
  matchlist$encryptedAccountId({ encryptedAccountId }) {
    return axios.get(`/matchlists/by-account/${encryptedAccountId}`)
  },
  /**
   * Get match timeline by match ID
   */
  timeline$matchId({ matchId }) {
    return axios.get(`/timelines/by-match/${matchId}`)
  },
  /**
   * Get match IDs by tournament code
   */
  matchId$tournamentCode({ tournamentCode }) {
    return axios.get(`/matches/by-tournament-code/${tournamentCode}/ids`)
  },
  /**
   * Get match by match ID and tournament code
   */
  match$matchId_tournamentCode({ matchId, tournamentCode }) {
    return axios.get(`/matches${matchId}/by-tournament-code/${tournamentCode}`)
  },
}

module.exports = Match
