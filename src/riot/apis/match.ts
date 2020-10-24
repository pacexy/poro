// v4

import { generateRequestMethods } from '../utils/request'
import { PLATFORM_BASE_URL, MATCH } from './config'

const r = generateRequestMethods(PLATFORM_BASE_URL + MATCH)

/**
 * MATCH-V4
 */
export default {
  /**
   * Get match by match ID
   */
  match$matchId({ matchId }: any) {
    return r.get(`/matches/${matchId}`)
  },
  /**
   * Get matchlist for games played on given account ID and
   * platform ID and filtered using given filter parameters, if any
   */
  // TODO: WIP
  matchlist$encryptedAccountId({ encryptedAccountId }: any) {
    return r.get(`/matchlists/by-account/${encryptedAccountId}`)
  },
  /**
   * Get match timeline by match ID
   */
  timeline$matchId({ matchId }: any) {
    return r.get(`/timelines/by-match/${matchId}`)
  },
  /**
   * Get match IDs by tournament code
   */
  matchId$tournamentCode({ tournamentCode }: any) {
    return r.get(`/matches/by-tournament-code/${tournamentCode}/ids`)
  },
  /**
   * Get match by match ID and tournament code
   */
  match$matchId_tournamentCode({ matchId, tournamentCode }: any) {
    return r.get(`/matches${matchId}/by-tournament-code/${tournamentCode}`)
  },
}
