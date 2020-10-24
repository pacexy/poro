/*! THIS FILE IS AUTO-GENERATED */

const axios = require('./axios')
const { generateURL } = require('./generate_url')
const { getType } = require('./util')

const leaguepedia = {
  async _fetch(table, parameter, callback) {
    const shouldUseCallback = getType(callback) === 'Function'

    const url = await generateURL(table, parameter)
    const res = await axios.get(url)

    if (shouldUseCallback) callback(null, res.data)

    return res.data
  },

  setAxiosRequestInterceptor(fulfilled, rejected) {
    axios.interceptors.request.use(fulfilled, rejected)
  },

  setAxiosResponseInterceptor(fulfilled, rejected) {
    axios.interceptors.response.use(fulfilled, rejected)
  },

  fetchCargoAttachments(parameter, callback) {
    return this._fetch('CargoAttachments', parameter, callback)
  },

  fetchChampionFlashcards(parameter, callback) {
    return this._fetch('ChampionFlashcards', parameter, callback)
  },

  fetchChampions(parameter, callback) {
    return this._fetch('Champions', parameter, callback)
  },

  fetchChromaSets(parameter, callback) {
    return this._fetch('ChromaSets', parameter, callback)
  },

  fetchChromas(parameter, callback) {
    return this._fetch('Chromas', parameter, callback)
  },

  fetchContracts(parameter, callback) {
    return this._fetch('Contracts', parameter, callback)
  },

  fetchCurrentLeagues(parameter, callback) {
    return this._fetch('CurrentLeagues', parameter, callback)
  },

  fetchDisambiguations(parameter, callback) {
    return this._fetch('Disambiguations', parameter, callback)
  },

  fetchEntities(parameter, callback) {
    return this._fetch('Entities', parameter, callback)
  },

  fetchExternalContent(parameter, callback) {
    return this._fetch('ExternalContent', parameter, callback)
  },

  fetchGCDArchive(parameter, callback) {
    return this._fetch('GCDArchive', parameter, callback)
  },

  fetchHooks(parameter, callback) {
    return this._fetch('Hooks', parameter, callback)
  },

  fetchIgnorePagedata(parameter, callback) {
    return this._fetch('IgnorePagedata', parameter, callback)
  },

  fetchIndividualAchievements(parameter, callback) {
    return this._fetch('IndividualAchievements', parameter, callback)
  },

  fetchItems(parameter, callback) {
    return this._fetch('Items', parameter, callback)
  },

  fetchLeagueGroups(parameter, callback) {
    return this._fetch('LeagueGroups', parameter, callback)
  },

  fetchLeagues(parameter, callback) {
    return this._fetch('Leagues', parameter, callback)
  },

  fetchListplayerCurrent(parameter, callback) {
    return this._fetch('ListplayerCurrent', parameter, callback)
  },

  fetchMatchSchedule(parameter, callback) {
    return this._fetch('MatchSchedule', parameter, callback)
  },

  fetchMatchScheduleGame(parameter, callback) {
    return this._fetch('MatchScheduleGame', parameter, callback)
  },

  fetchNASGLadder2018(parameter, callback) {
    return this._fetch('NASGLadder2018', parameter, callback)
  },

  fetchNTLGlossary(parameter, callback) {
    return this._fetch('NTLGlossary', parameter, callback)
  },

  fetchNewsItems(parameter, callback) {
    return this._fetch('NewsItems', parameter, callback)
  },

  fetchOrganizations(parameter, callback) {
    return this._fetch('Organizations', parameter, callback)
  },

  fetchParticipantsArgs(parameter, callback) {
    return this._fetch('ParticipantsArgs', parameter, callback)
  },

  fetchPatchNotes(parameter, callback) {
    return this._fetch('PatchNotes', parameter, callback)
  },

  fetchPentakills(parameter, callback) {
    return this._fetch('Pentakills', parameter, callback)
  },

  fetchPicksAndBansS7(parameter, callback) {
    return this._fetch('PicksAndBansS7', parameter, callback)
  },

  fetchPlayerImages(parameter, callback) {
    return this._fetch('PlayerImages', parameter, callback)
  },

  fetchPlayerLeagueHistory(parameter, callback) {
    return this._fetch('PlayerLeagueHistory', parameter, callback)
  },

  fetchPlayerPronunciationFiles(parameter, callback) {
    return this._fetch('PlayerPronunciationFiles', parameter, callback)
  },

  fetchPlayerRedirects(parameter, callback) {
    return this._fetch('PlayerRedirects', parameter, callback)
  },

  fetchPlayerRenames(parameter, callback) {
    return this._fetch('PlayerRenames', parameter, callback)
  },

  fetchPlayers(parameter, callback) {
    return this._fetch('Players', parameter, callback)
  },

  fetchRegionStatuses(parameter, callback) {
    return this._fetch('RegionStatuses', parameter, callback)
  },

  fetchRegions(parameter, callback) {
    return this._fetch('Regions', parameter, callback)
  },

  fetchResidencyChanges(parameter, callback) {
    return this._fetch('ResidencyChanges', parameter, callback)
  },

  fetchRetirements(parameter, callback) {
    return this._fetch('Retirements', parameter, callback)
  },

  fetchRosterChangePortalDates(parameter, callback) {
    return this._fetch('RosterChangePortalDates', parameter, callback)
  },

  fetchRosterChangePortalPages(parameter, callback) {
    return this._fetch('RosterChangePortalPages', parameter, callback)
  },

  fetchRosterChanges(parameter, callback) {
    return this._fetch('RosterChanges', parameter, callback)
  },

  fetchRosterRumors(parameter, callback) {
    return this._fetch('RosterRumors', parameter, callback)
  },

  fetchScoreboardGames(parameter, callback) {
    return this._fetch('ScoreboardGames', parameter, callback)
  },

  fetchScoreboardPlayers(parameter, callback) {
    return this._fetch('ScoreboardPlayers', parameter, callback)
  },

  fetchScoreboardTeams(parameter, callback) {
    return this._fetch('ScoreboardTeams', parameter, callback)
  },

  fetchSisterTeams(parameter, callback) {
    return this._fetch('SisterTeams', parameter, callback)
  },

  fetchSkins(parameter, callback) {
    return this._fetch('Skins', parameter, callback)
  },

  fetchSkinsUsed(parameter, callback) {
    return this._fetch('SkinsUsed', parameter, callback)
  },

  fetchStandings(parameter, callback) {
    return this._fetch('Standings', parameter, callback)
  },

  fetchStandingsArgs(parameter, callback) {
    return this._fetch('StandingsArgs', parameter, callback)
  },

  fetchTeamRedirects(parameter, callback) {
    return this._fetch('TeamRedirects', parameter, callback)
  },

  fetchTeamRenames(parameter, callback) {
    return this._fetch('TeamRenames', parameter, callback)
  },

  fetchTeams(parameter, callback) {
    return this._fetch('Teams', parameter, callback)
  },

  fetchTeamsWithAutoRosters(parameter, callback) {
    return this._fetch('TeamsWithAutoRosters', parameter, callback)
  },

  fetchTenures(parameter, callback) {
    return this._fetch('Tenures', parameter, callback)
  },

  fetchTenuresUnbroken(parameter, callback) {
    return this._fetch('TenuresUnbroken', parameter, callback)
  },

  fetchTournamentGroups(parameter, callback) {
    return this._fetch('TournamentGroups', parameter, callback)
  },

  fetchTournamentPlayers(parameter, callback) {
    return this._fetch('TournamentPlayers', parameter, callback)
  },

  fetchTournamentResults(parameter, callback) {
    return this._fetch('TournamentResults', parameter, callback)
  },

  fetchTournamentResults1v1(parameter, callback) {
    return this._fetch('TournamentResults1v1', parameter, callback)
  },

  fetchTournamentRosters(parameter, callback) {
    return this._fetch('TournamentRosters', parameter, callback)
  },

  fetchTournamentTabs(parameter, callback) {
    return this._fetch('TournamentTabs', parameter, callback)
  },

  fetchTournaments(parameter, callback) {
    return this._fetch('Tournaments', parameter, callback)
  },

  fetchUserPredictionGroups(parameter, callback) {
    return this._fetch('UserPredictionGroups', parameter, callback)
  },

  fetchUserPredictions(parameter, callback) {
    return this._fetch('UserPredictions', parameter, callback)
  },
}

module.exports = leaguepedia
