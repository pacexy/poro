// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, LEAGUE } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + LEAGUE)

/**
 * LEAGUE-V4
 */
export default {
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
