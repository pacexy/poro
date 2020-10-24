// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, CHAMPION_MASTERY } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + CHAMPION_MASTERY)

/**
 * CHAMPION-MASTERY-V4
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ChampionMa... Remove this comment to see the full error message
const ChampionMastery = {
  /**
   * Get all champion mastery entries sorted by number of champion points descending
   */
  championMasteries$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/champion-masteries/by-summoner/${encryptedSummonerId}`)
  },
  /**
   * Get a champion mastery by player ID and champion ID
   */
  championMastery$encryptedSummonerId_championId({
    encryptedSummonerId,
    championId,
  }: any) {
    return r.get(
      `/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${championId}`,
    )
  },
  /**
   * Get a player's total champion mastery score, which is the sum of individual champion mastery levels
   */
  championMasteryScore$encryptedSummonerId({ encryptedSummonerId }: any) {
    return r.get(`/scores/by-summoner/${encryptedSummonerId}`)
  },
}

module.exports = ChampionMastery
