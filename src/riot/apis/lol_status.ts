// v3

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, LOL_STATUS } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + LOL_STATUS)

/**
 * LOL-STATUS-V3
 */
export default {
  /**
   * Get League of Legends status for the given shard
   */
  leagueEntries$queue_tier_division() {
    return r.get('/shard-data')
  },
}
