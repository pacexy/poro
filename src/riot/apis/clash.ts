// v1

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, CLASH } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + CLASH)

/**
 * CLASH-V1
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Clash'.
const Clash = {
  /**
   * Get players by summoner ID
   */
  players$summonerId({ summonerId }: any) {
    return r.get(`/players/by-summoner/${summonerId}`)
  },
  /**
   * Get team by ID
   */
  team$teamId({ teamId }: any) {
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
  tournament$teamId({ teamId }: any) {
    return r.get(`/tournaments/by-team/${teamId}`)
  },
  /**
   * Get tournament by ID
   */
  tournament$tournamentId({ tournamentId }: any) {
    return r.get(`/tournaments/${tournamentId}`)
  },
}

module.exports = Clash
