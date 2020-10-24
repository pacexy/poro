// v3

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, CHAMPION } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + CHAMPION)

/**
 * CHAMPION-V3
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Champion'.
const Champion = {
  /**
   * Returns champion rotations, including free-to-play and low-level free-to-play rotations
   */
  championRotations() {
    return r.get('/lol/platform/v3/champion-rotations')
  },
}

module.exports = Champion
