// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, LEAGUE } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + LEAGUE)

/**
 * LEAGUE-V4
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'League'.
const League = {
  /**
   * Get the challenger league for given queue
   */
  challengerLeague$queue({ queue }: any) {
    return r.get(`/challengerleagues/by-queue/${queue}`)
  },
  /**
   * Get league entries in all queues for a given summoner ID
   */
  leagueEntries$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/entries/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get all the league entries
   */
  leagueEntries$queue_tier_division({ queue, tier, division }: any) {
    return r.get(`/entries/${queue}/${tier}/${division}`)
  },
  /**
   * Get the grandmaster league of a specific queue
   */
  grandmasterLeague$queue({ queue }: any) {
    return r.get(`/grandmasterleagues/by-queue/${queue}`)
  },
  /**
   * Get league with given ID, including inactive entries
   */
  league$leagueId({ leagueId }: any) {
    return r.get(`/leagues/${leagueId}`)
  },
  /**
   * Get the master league for given queue
   */
  masterLeague$queue({ queue }: any) {
    return r.get(`/masterleagues/by-queue/${queue}`)
  },
}

module.exports = League
