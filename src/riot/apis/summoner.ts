// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, SUMMONER } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + SUMMONER)

/**
 * SUMMONER-V4
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Summoner'.
const Summoner = {
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

module.exports = Summoner
