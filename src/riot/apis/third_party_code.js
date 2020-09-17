// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, THIRD_PARTY_CODE } = require('./config')

const r = generateRequestMethods(PLATFORM_BASE_URL + THIRD_PARTY_CODE)

/**
 * THIRD-PARTY-CODE-V4
 */
const ThirdPartyCode = {
  /**
   * Get third party code for a given summoner ID
   */
  thirdPartyCode$encryptedSummonerId({ encryptedSummonerId }) {
    return r.get(`/third-party-code/by-summoner/${encryptedSummonerId}`)
  },
}

module.exports = ThirdPartyCode
