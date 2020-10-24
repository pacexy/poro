/*! THIS FILE IS AUTO-GENERATED */

import axios from './axios'
import { generateURL } from './generate_url'
import { getType } from './util'

export const leaguepedia = {
  async _fetch(table: any, parameter?: any, callback?: any) {
    const shouldUseCallback = getType(callback) === 'Function'

    const url = await generateURL(table, parameter)
    const res = await axios.get(url)

    if (shouldUseCallback) callback(null, res.data)

    return res.data
  },

  setAxiosRequestInterceptor(onFulfilled: any, onRejected: any) {
    axios.interceptors.request.use(onFulfilled, onRejected)
  },

  setAxiosResponseInterceptor(onFulfilled: any, onRejected: any) {
    axios.interceptors.response.use(onFulfilled, onRejected)
  },

  fetchCargoAttachments(parameter?: any, callback?: any) {
    return this._fetch('CargoAttachments', parameter, callback)
  },

  fetchChampionFlashcards(parameter?: any, callback?: any) {
    return this._fetch('ChampionFlashcards', parameter, callback)
  },

  fetchChampions(parameter?: any, callback?: any) {
    return this._fetch('Champions', parameter, callback)
  },

  fetchChromaSets(parameter?: any, callback?: any) {
    return this._fetch('ChromaSets', parameter, callback)
  },

  fetchChromas(parameter?: any, callback?: any) {
    return this._fetch('Chromas', parameter, callback)
  },

  fetchContracts(parameter?: any, callback?: any) {
    return this._fetch('Contracts', parameter, callback)
  },

  fetchCurrentLeagues(parameter?: any, callback?: any) {
    return this._fetch('CurrentLeagues', parameter, callback)
  },

  fetchDisambiguations(parameter?: any, callback?: any) {
    return this._fetch('Disambiguations', parameter, callback)
  },

  fetchEntities(parameter?: any, callback?: any) {
    return this._fetch('Entities', parameter, callback)
  },

  fetchExternalContent(parameter?: any, callback?: any) {
    return this._fetch('ExternalContent', parameter, callback)
  },

  fetchGCDArchive(parameter?: any, callback?: any) {
    return this._fetch('GCDArchive', parameter, callback)
  },

  fetchHooks(parameter?: any, callback?: any) {
    return this._fetch('Hooks', parameter, callback)
  },

  fetchIgnorePagedata(parameter?: any, callback?: any) {
    return this._fetch('IgnorePagedata', parameter, callback)
  },

  fetchIndividualAchievements(parameter?: any, callback?: any) {
    return this._fetch('IndividualAchievements', parameter, callback)
  },

  fetchItems(parameter?: any, callback?: any) {
    return this._fetch('Items', parameter, callback)
  },

  fetchLeagueGroups(parameter?: any, callback?: any) {
    return this._fetch('LeagueGroups', parameter, callback)
  },

  fetchLeagues(parameter?: any, callback?: any) {
    return this._fetch('Leagues', parameter, callback)
  },

  fetchListplayerCurrent(parameter?: any, callback?: any) {
    return this._fetch('ListplayerCurrent', parameter, callback)
  },

  fetchMatchSchedule(parameter?: any, callback?: any) {
    return this._fetch('MatchSchedule', parameter, callback)
  },

  fetchMatchScheduleGame(parameter?: any, callback?: any) {
    return this._fetch('MatchScheduleGame', parameter, callback)
  },

  fetchNASGLadder2018(parameter?: any, callback?: any) {
    return this._fetch('NASGLadder2018', parameter, callback)
  },

  fetchNTLGlossary(parameter?: any, callback?: any) {
    return this._fetch('NTLGlossary', parameter, callback)
  },

  fetchNewsItems(parameter?: any, callback?: any) {
    return this._fetch('NewsItems', parameter, callback)
  },

  fetchOrganizations(parameter?: any, callback?: any) {
    return this._fetch('Organizations', parameter, callback)
  },

  fetchParticipantsArgs(parameter?: any, callback?: any) {
    return this._fetch('ParticipantsArgs', parameter, callback)
  },

  fetchPatchNotes(parameter?: any, callback?: any) {
    return this._fetch('PatchNotes', parameter, callback)
  },

  fetchPentakills(parameter?: any, callback?: any) {
    return this._fetch('Pentakills', parameter, callback)
  },

  fetchPicksAndBansS7(parameter?: any, callback?: any) {
    return this._fetch('PicksAndBansS7', parameter, callback)
  },

  fetchPlayerImages(parameter?: any, callback?: any) {
    return this._fetch('PlayerImages', parameter, callback)
  },

  fetchPlayerLeagueHistory(parameter?: any, callback?: any) {
    return this._fetch('PlayerLeagueHistory', parameter, callback)
  },

  fetchPlayerPronunciationFiles(parameter?: any, callback?: any) {
    return this._fetch('PlayerPronunciationFiles', parameter, callback)
  },

  fetchPlayerRedirects(parameter?: any, callback?: any) {
    return this._fetch('PlayerRedirects', parameter, callback)
  },

  fetchPlayerRenames(parameter?: any, callback?: any) {
    return this._fetch('PlayerRenames', parameter, callback)
  },

  fetchPlayers(parameter?: any, callback?: any) {
    return this._fetch('Players', parameter, callback)
  },

  fetchRegionStatuses(parameter?: any, callback?: any) {
    return this._fetch('RegionStatuses', parameter, callback)
  },

  fetchRegions(parameter?: any, callback?: any) {
    return this._fetch('Regions', parameter, callback)
  },

  fetchResidencyChanges(parameter?: any, callback?: any) {
    return this._fetch('ResidencyChanges', parameter, callback)
  },

  fetchRetirements(parameter?: any, callback?: any) {
    return this._fetch('Retirements', parameter, callback)
  },

  fetchRosterChangePortalDates(parameter?: any, callback?: any) {
    return this._fetch('RosterChangePortalDates', parameter, callback)
  },

  fetchRosterChangePortalPages(parameter?: any, callback?: any) {
    return this._fetch('RosterChangePortalPages', parameter, callback)
  },

  fetchRosterChanges(parameter?: any, callback?: any) {
    return this._fetch('RosterChanges', parameter, callback)
  },

  fetchRosterRumors(parameter?: any, callback?: any) {
    return this._fetch('RosterRumors', parameter, callback)
  },

  fetchScoreboardGames(parameter?: any, callback?: any) {
    return this._fetch('ScoreboardGames', parameter, callback)
  },

  fetchScoreboardPlayers(parameter?: any, callback?: any) {
    return this._fetch('ScoreboardPlayers', parameter, callback)
  },

  fetchScoreboardTeams(parameter?: any, callback?: any) {
    return this._fetch('ScoreboardTeams', parameter, callback)
  },

  fetchSisterTeams(parameter?: any, callback?: any) {
    return this._fetch('SisterTeams', parameter, callback)
  },

  fetchSkins(parameter?: any, callback?: any) {
    return this._fetch('Skins', parameter, callback)
  },

  fetchSkinsUsed(parameter?: any, callback?: any) {
    return this._fetch('SkinsUsed', parameter, callback)
  },

  fetchStandings(parameter?: any, callback?: any) {
    return this._fetch('Standings', parameter, callback)
  },

  fetchStandingsArgs(parameter?: any, callback?: any) {
    return this._fetch('StandingsArgs', parameter, callback)
  },

  fetchTeamRedirects(parameter?: any, callback?: any) {
    return this._fetch('TeamRedirects', parameter, callback)
  },

  fetchTeamRenames(parameter?: any, callback?: any) {
    return this._fetch('TeamRenames', parameter, callback)
  },

  fetchTeams(parameter?: any, callback?: any) {
    return this._fetch('Teams', parameter, callback)
  },

  fetchTeamsWithAutoRosters(parameter?: any, callback?: any) {
    return this._fetch('TeamsWithAutoRosters', parameter, callback)
  },

  fetchTenures(parameter?: any, callback?: any) {
    return this._fetch('Tenures', parameter, callback)
  },

  fetchTenuresUnbroken(parameter?: any, callback?: any) {
    return this._fetch('TenuresUnbroken', parameter, callback)
  },

  fetchTournamentGroups(parameter?: any, callback?: any) {
    return this._fetch('TournamentGroups', parameter, callback)
  },

  fetchTournamentPlayers(parameter?: any, callback?: any) {
    return this._fetch('TournamentPlayers', parameter, callback)
  },

  fetchTournamentResults(parameter?: any, callback?: any) {
    return this._fetch('TournamentResults', parameter, callback)
  },

  fetchTournamentResults1v1(parameter?: any, callback?: any) {
    return this._fetch('TournamentResults1v1', parameter, callback)
  },

  fetchTournamentRosters(parameter?: any, callback?: any) {
    return this._fetch('TournamentRosters', parameter, callback)
  },

  fetchTournamentTabs(parameter?: any, callback?: any) {
    return this._fetch('TournamentTabs', parameter, callback)
  },

  fetchTournaments(parameter?: any, callback?: any) {
    return this._fetch('Tournaments', parameter, callback)
  },

  fetchUserPredictionGroups(parameter?: any, callback?: any) {
    return this._fetch('UserPredictionGroups', parameter, callback)
  },

  fetchUserPredictions(parameter?: any, callback?: any) {
    return this._fetch('UserPredictions', parameter, callback)
  },
}
