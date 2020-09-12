// v1

const { REGION_BASE_URL, ACCOUNT } = require('../config')

const axios = require('../axios')
axios.defaults.baseURL = REGION_BASE_URL + ACCOUNT

/**
 * ACCOUNT-V1
 * 
 * There are three routing values for account-v1; americas, asia, and europe. You can query for any account in any region. We recommend using the nearest cluster.
 */
const Account = {
  /**
   * Get account by puuid
   */
  account$puuid({ puuid }) {
    return axios.get(`/accounts/by-puuid/${puuid}`)
  },
  /**
   * Get account by riot id
   */
  account$gameName_tagLine({ gameName, tagLine }) {
    return axios.get(`/accounts/by-riot-id/${gameName}/${tagLine}`)
  },
  /**
   * Get active shard for a player
   */
  activeShards$Game_Puuid({ game, puuid }) {
    return axios.get(`/active-shards/by-game/${game}/by-puuid/${puuid}`)
  },
}

module.exports = Account
