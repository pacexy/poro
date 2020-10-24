// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, SUMMONER } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + SUMMONER)

/**
 * SUMMONER-V4
 */
export default {
  /**
   * Get a summoner by account ID
   */
  summoner$encryptedAccountId({ encryptedAccountId }: any) {
    return r.get(`/summoners/by-account/${encryptedAccountId}`)
  },
  /**
   * Get a summoner by summoner name
   */
  summoner$summonerName({ summonerName }: any) {
    return r.get(`/summoners/by-name/${summonerName}`)
  },
  /**
   * Get a summoner by PUUID
   */
  summoner$encryptedPUUID({ encryptedPUUID }: any) {
    return r.get(`/summoners/by-puuid/${encryptedPUUID}`)
  },
  /**
   * Get a summoner by summoner ID
   */
  summoner$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/summoners/${encryptedSummonerId}`)
  },
}
