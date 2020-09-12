// v3

const axios = require('../axios')
const { PLATFORM_BASE_URL, CHAMPION } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + CHAMPION

/**
 * CHAMPION-V3
 */
const Champion = {
  /**
   * Returns champion rotations, including free-to-play and low-level free-to-play rotations
   */
  championRotations() {
    return axios.get('/lol/platform/v3/champion-rotations')
  },
}

module.exports = Champion
