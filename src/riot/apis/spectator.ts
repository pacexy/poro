// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, SPECTATOR } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + SPECTATOR)

/**
 * SPECTATOR-V4
 */
export default {
  /**
   * Get current game information for the given summoner ID
   */
  currentGame$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/active-games/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get list of featured games
   */
  featuredGames() {
    return r.get('/featured-games')
  },
}
