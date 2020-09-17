// v1

const { generateRequestMethods } = require('../utils/request')
const { REGION_BASE_URL, ACCOUNT } = require('./config')

const r = generateRequestMethods(REGION_BASE_URL + ACCOUNT)

/**
 * ACCOUNT-V1
 *
 * There are three routing values for account-v1; americas, asia,
 * and europe. You can query for any account in any region.
 * We recommend using the nearest cluster.
 */
const Account = {
  /**
   * Get account by puuid
   */
  account$puuid({ puuid }) {
    return r.get(`/accounts/by-puuid/${puuid}`)
  },
  /**
   * Get account by riot id
   */
  account$gameName_tagLine({ gameName, tagLine }) {
    return r.get(`/accounts/by-riot-id/${gameName}/${tagLine}`)
  },
  /**
   * Get active shard for a player
   */
  activeShards$game_puuid({ game, puuid }) {
    return r.get(`/active-shards/by-game/${game}/by-puuid/${puuid}`)
  },
}

module.exports = Account
