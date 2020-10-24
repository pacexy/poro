// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, LEAGUE_EXP } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + LEAGUE_EXP)

/**
 * LEAGUE-EXP-V4
 *
 * At the request of a Github issue {@link https://github.com/RiotGames/developer-relations/issues/145}.
 * We've added an experimental league-exp-v4 endpoint.
 * This new endpoint is a duplicate of the endpoint in league-v4,
 * but it also supports the apex tiers (Challenger, Grandmaster,
 * and Master). In November we'll evaluate whether this endpoint
 * delivers enough value to merit its continual support.
 */
export default {
  /**
   * Get all the league entries
   */
  leagueEntries$queue_tier_division({ queue, tier, division }: any) {
    return r.get(`/entries/${queue}/${tier}/${division}`)
  },
}
