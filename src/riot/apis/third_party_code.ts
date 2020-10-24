// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, THIRD_PARTY_CODE } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + THIRD_PARTY_CODE)

/**
 * THIRD-PARTY-CODE-V4
 */
export default {
  /**
   * Get third party code for a given summoner ID
   */
  thirdPartyCode$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/third-party-code/by-summoner/${encryptedSummonerId}`)
  },
}
