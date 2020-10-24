// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, THIRD_PARTY_CODE } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + THIRD_PARTY_CODE)

/**
 * THIRD-PARTY-CODE-V4
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ThirdParty... Remove this comment to see the full error message
const ThirdPartyCode = {
  /**
   * Get third party code for a given summoner ID
   */
  thirdPartyCode$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/third-party-code/by-summoner/${encryptedSummonerId}`)
  },
}

module.exports = ThirdPartyCode
