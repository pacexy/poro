// v4

const { generateRequestMethods } = require('../utils/request')
const { PLATFORM_BASE_URL, TOURNAMENT_STUB } = require('./config')

const r = generateRequestMethods(PLATFORM_BASE_URL + TOURNAMENT_STUB)

/**
 * SUMMONER-V4
 *
 * The tournament-stub API is a stand in that simulates the behavior
 * of the tournament API. Developers looking to apply for tournament
 * API access should use the stub to mock their implementation before
 * applying for a production key.
 */
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
  }) {
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
  lobbyEvents$tournamentCode({ tournamentCode }) {
    return r.get(`/lobby-events/by-code/${tournamentCode}`)
  },
  /**
   * Creates a mock tournament provider and returns its ID
   */
  _tournamentProvider({ ProviderRegistrationParameters: { region, url } }) {
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
  _tournament({ TournamentRegistrationParameters: { name, providerId } }) {
    return r.post('/tournaments', {
      data: {
        name,
        providerId,
      },
    })
  },
}

module.exports = TournamentStub