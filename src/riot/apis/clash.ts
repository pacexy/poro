// v1

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, CLASH } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + CLASH)

/**
 * CLASH-V1
 */
export default {
  /**
   * Get players by summoner ID
   */
  players$summonerId({ summonerId }: any) {
    return r.get(`/players/by-summoner/${summonerId}`)
  },
  /**
   * Get team by ID
   */
  team$teamId({ teamId }: any) {
    return r.get(`/teams/${teamId}`)
  },
  /**
   * Get all active or upcoming tournaments
   */
  tournaments() {
    return r.get('/tournaments')
  },
  /**
   * Get tournament by team ID
   */
  tournament$teamId({ teamId }: any) {
    return r.get(`/tournaments/by-team/${teamId}`)
  },
  /**
   * Get tournament by ID
   */
  tournament$tournamentId({ tournamentId }: any) {
    return r.get(`/tournaments/${tournamentId}`)
  },
}
