// v4

const axios = require('../axios')
const { PLATFORM_BASE_URL, TOURNAMENT } = require('../config')

axios.defaults.baseURL = PLATFORM_BASE_URL + TOURNAMENT

/**
 * SUMMONER-V4
 *
 * The tournament-stub API is a stand in that simulates the behavior
 * of the tournament API. Developers looking to apply for tournament
 * API access should use the stub to mock their implementation before
 * applying for a production key.
 */
const Tournament = {
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
    return axios.post('/codes', {
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
   * Returns the tournament code DTO associated with a tournament code string
   */
  tournamentCodeDTO$tournamentCode({ tournamentCode }) {
    return axios.get(`/codes/${tournamentCode}`)
  },
  /**
   * Update the pick type, map, spectator type, or allowed summoners for a code
   */
  $_tournamentCode({
    tournamentCode,
    TournamentCodeUpdateParameters: {
      allowedSummonerIds,
      mapType,
      pickType,
      spectatorType,
    },
  }) {
    return axios.put(`/codes/${tournamentCode}`, {
      data: {
        allowedSummonerIds,
        mapType,
        pickType,
        spectatorType,
      },
    })
  },
  /**
   * Gets a list of lobby events by tournament code
   */
  lobbyEvents$tournamentCode({ tournamentCode }) {
    return axios.get(`/lobby-events/by-code/${tournamentCode}`)
  },
  /**
   * Creates a tournament provider and returns its ID
   */
  _tournamentProvider({ ProviderRegistrationParameters: { region, url } }) {
    return axios.post('/providers', {
      data: {
        region,
        url,
      },
    })
  },
  /**
   * Creates a tournament and returns its ID
   */
  _tournament({ TournamentRegistrationParameters: { name, providerId } }) {
    return axios.post('/tournaments', {
      data: {
        name,
        providerId,
      },
    })
  },
}

module.exports = Tournament
