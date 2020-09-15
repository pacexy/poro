// v3

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, CHAMPION } = require('../config')

const r = generateRequestMethods(PLATFORM_BASE_URL + CHAMPION)

/**
 * CHAMPION-V3
 */
const Champion = {
  /**
   * Returns champion rotations, including free-to-play and low-level free-to-play rotations
   */
  championRotations() {
    return r.get('/lol/platform/v3/champion-rotations')
  },
}

module.exports = Champion
