// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, MATCH } = require('../config')

const r = generateRequestMethods(PLATFORM_BASE_URL + MATCH)

/**
 * MATCH-V4
 */
const Match = {
  /**
   * Get match by match ID
   */
  match$matchId({ matchId }) {
    return r.get(`/matches/${matchId}`)
  },
  /**
   * Get matchlist for games played on given account ID and
   * platform ID and filtered using given filter parameters, if any
   */
  // TODO: WIP
  matchlist$encryptedAccountId({ encryptedAccountId }) {
    return r.get(`/matchlists/by-account/${encryptedAccountId}`)
  },
  /**
   * Get match timeline by match ID
   */
  timeline$matchId({ matchId }) {
    return r.get(`/timelines/by-match/${matchId}`)
  },
  /**
   * Get match IDs by tournament code
   */
  matchId$tournamentCode({ tournamentCode }) {
    return r.get(`/matches/by-tournament-code/${tournamentCode}/ids`)
  },
  /**
   * Get match by match ID and tournament code
   */
  match$matchId_tournamentCode({ matchId, tournamentCode }) {
    return r.get(`/matches${matchId}/by-tournament-code/${tournamentCode}`)
  },
}

module.exports = Match
