// v3

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, CHAMPION } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + CHAMPION)

/**
 * CHAMPION-V3
 */
export default {
  /**
   * Returns champion rotations, including free-to-play and low-level free-to-play rotations
   */
  championRotations() {
    return r.get('/lol/platform/v3/champion-rotations')
  },
}
