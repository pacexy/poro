// v4

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'generateRe... Remove this comment to see the full error message
const { generateRequestMethods } = require('../utils/request')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PLATFORM_B... Remove this comment to see the full error message
const { PLATFORM_BASE_URL, TOURNAMENT_STUB } = require('./config')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'r'.
const r = generateRequestMethods(PLATFORM_BASE_URL + TOURNAMENT_STUB)

/**
 * SUMMONER-V4
 *
 * The tournament-stub API is a stand in that simulates the behavior
 * of the tournament API. Developers looking to apply for tournament
 * API access should use the stub to mock their implementation before
 * applying for a production key.
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tournament... Remove this comment to see the full error message
const TournamentStub = {
  /**
   * Create a mock tournament code for the given tournament
   */
  // TODO: WIP
  _tournamentCode({
    count,
    tournamentId,

    TournamentCodeParameters: {
      allowedSummonerIds,
      mapType,
      metadata,
      pickType,
      spectatorType,
      teamSize,
    },
  }: any) {
    return r.post('/codes', {
      params: { count, tournamentId },
      data: {
        allowedSummonerIds,
        mapType,
        metadata,
        pickType,
        spectatorType,
        teamSize,
      },
    })
  },
  /**
   * Gets a mock list of lobby events by tournament code
   */
  lobbyEvents$tournamentCode({ tournamentCode }: any) {
    return r.get(`/lobby-events/by-code/${tournamentCode}`)
  },
  /**
   * Creates a mock tournament provider and returns its ID
   */
  _tournamentProvider({
    ProviderRegistrationParameters: { region, url },
  }: any) {
    return r.post('/providers', {
      data: {
        region,
        url,
      },
    })
  },
  /**
   * Creates a mock tournament and returns its ID
   */
  _tournament({ TournamentRegistrationParameters: { name, providerId } }: any) {
    return r.post('/tournaments', {
      data: {
        name,
        providerId,
      },
    })
  },
}

module.exports = TournamentStub
