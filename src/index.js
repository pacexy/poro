;(function () {
  const { axios, setAxiosRequestInterceptor, setAxiosResponseInterceptor } = require('./axios')
  const { generateURL } = require('./leaguepedia')
  const { getType } = require('./util')
  const t = require('./table_name')

  class Poro {
    constructor() {}

    async _fetch(table, parameter, callback) {
      const shouldUseCallback = getType(callback) === 'Function'

      const res = await axios.get(generateURL(table, parameter))

      if (shouldUseCallback) callback(null, res.data)

      return res.data
    }

    setAxiosRequestInterceptor
    setAxiosResponseInterceptor

    fetchCargoAttachments(parameter, callback) {
      return this._fetch(t.CARGO_ATTACHMENTS, parameter, callback)
    }

    fetchChampionFlashcards(parameter, callback) {
      return this._fetch(t.CHAMPION_FLASHCARDS, parameter, callback)
    }

    fetchChampions(parameter, callback) {
      return this._fetch(t.CHAMPIONS, parameter, callback)
    }

    fetchChromaSets(parameter, callback) {
      return this._fetch(t.CHROMA_SETS, parameter, callback)
    }

    fetchChromas(parameter, callback) {
      return this._fetch(t.CHROMAS, parameter, callback)
    }

    fetchContracts(parameter, callback) {
      return this._fetch(t.CONTRACTS, parameter, callback)
    }

    fetchCurrentLeagues(parameter, callback) {
      return this._fetch(t.CURRENT_LEAGUES, parameter, callback)
    }

    fetchDisambiguations(parameter, callback) {
      return this._fetch(t.DISAMBIGUATIONS, parameter, callback)
    }

    fetchEntities(parameter, callback) {
      return this._fetch(t.ENTITIES, parameter, callback)
    }

    fetchExternalContent(parameter, callback) {
      return this._fetch(t.EXTERNAL_CONTENT, parameter, callback)
    }

    fetchGCDArchive(parameter, callback) {
      return this._fetch(t.GCD_ARCHIVE, parameter, callback)
    }

    fetchHooks(parameter, callback) {
      return this._fetch(t.HOOKS, parameter, callback)
    }

    fetchIgnorePagedata(parameter, callback) {
      return this._fetch(t.IGNORE_PAGEDATA, parameter, callback)
    }

    fetchIndividualAchievements(parameter, callback) {
      return this._fetch(t.INDIVIDUAL_ACHIEVEMENTS, parameter, callback)
    }

    fetchItems(parameter, callback) {
      return this._fetch(t.ITEMS, parameter, callback)
    }

    fetchLeagueGroups(parameter, callback) {
      return this._fetch(t.LEAGUE_GROUPS, parameter, callback)
    }

    fetchLeagues(parameter, callback) {
      return this._fetch(t.LEAGUES, parameter, callback)
    }

    fetchListplayerCurrent(parameter, callback) {
      return this._fetch(t.LISTPLAYER_CURRENT, parameter, callback)
    }

    fetchMatchSchedule(parameter, callback) {
      return this._fetch(t.MATCH_SCHEDULE, parameter, callback)
    }

    fetchMatchScheduleGame(parameter, callback) {
      return this._fetch(t.MATCH_SCHEDULE_GAME, parameter, callback)
    }

    fetchNASGLadder2018(parameter, callback) {
      return this._fetch(t.NASG_LADDER_2018, parameter, callback)
    }

    fetchNTLGlossary(parameter, callback) {
      return this._fetch(t.NTL_GLOSSARY, parameter, callback)
    }

    fetchNewsItems(parameter, callback) {
      return this._fetch(t.NEWS_ITEMS, parameter, callback)
    }

    fetchOrganizations(parameter, callback) {
      return this._fetch(t.ORGANIZATIONS, parameter, callback)
    }

    fetchParticipantsArgs(parameter, callback) {
      return this._fetch(t.PARTICIPANTS_ARGS, parameter, callback)
    }

    fetchPatchNotes(parameter, callback) {
      return this._fetch(t.PATCH_NOTES, parameter, callback)
    }

    fetchPentakills(parameter, callback) {
      return this._fetch(t.PENTAKILLS, parameter, callback)
    }

    fetchPicksAndBansS7(parameter, callback) {
      return this._fetch(t.PICKS_AND_BANS_S7, parameter, callback)
    }

    fetchPlayerImages(parameter, callback) {
      return this._fetch(t.PLAYER_IMAGES, parameter, callback)
    }

    fetchPlayerLeagueHistory(parameter, callback) {
      return this._fetch(t.PLAYER_LEAGUE_HISTORY, parameter, callback)
    }

    fetchPlayerPronunciationFiles(parameter, callback) {
      return this._fetch(t.PLAYER_PRONUNCIATION_FILES, parameter, callback)
    }

    fetchPlayerRedirects(parameter, callback) {
      return this._fetch(t.PLAYER_REDIRECTS, parameter, callback)
    }

    fetchPlayerRenames(parameter, callback) {
      return this._fetch(t.PLAYER_RENAMES, parameter, callback)
    }

    fetchPlayers(parameter, callback) {
      return this._fetch(t.PLAYERS, parameter, callback)
    }

    fetchRegionStatuses(parameter, callback) {
      return this._fetch(t.REGION_STATUSES, parameter, callback)
    }

    fetchRegions(parameter, callback) {
      return this._fetch(t.REGIONS, parameter, callback)
    }

    fetchResidencyChanges(parameter, callback) {
      return this._fetch(t.RESIDENCY_CHANGES, parameter, callback)
    }

    fetchRetirements(parameter, callback) {
      return this._fetch(t.RETIREMENTS, parameter, callback)
    }

    fetchRosterChangePortalDates(parameter, callback) {
      return this._fetch(t.ROSTER_CHANGE_PORTAL_DATES, parameter, callback)
    }

    fetchRosterChangePortalPages(parameter, callback) {
      return this._fetch(t.ROSTER_CHANGE_PORTAL_PAGES, parameter, callback)
    }

    fetchRosterChanges(parameter, callback) {
      return this._fetch(t.ROSTER_CHANGES, parameter, callback)
    }

    fetchRosterRumors(parameter, callback) {
      return this._fetch(t.ROSTER_RUMORS, parameter, callback)
    }

    fetchScoreboardGames(parameter, callback) {
      return this._fetch(t.SCOREBOARD_GAMES, parameter, callback)
    }

    fetchScoreboardPlayers(parameter, callback) {
      return this._fetch(t.SCOREBOARD_PLAYERS, parameter, callback)
    }

    fetchScoreboardTeams(parameter, callback) {
      return this._fetch(t.SCOREBOARD_TEAMS, parameter, callback)
    }

    fetchSisterTeams(parameter, callback) {
      return this._fetch(t.SISTER_TEAMS, parameter, callback)
    }

    fetchSkins(parameter, callback) {
      return this._fetch(t.SKINS, parameter, callback)
    }

    fetchSkinsUsed(parameter, callback) {
      return this._fetch(t.SKINS_USED, parameter, callback)
    }

    fetchStandings(parameter, callback) {
      return this._fetch(t.STANDINGS, parameter, callback)
    }

    fetchStandingsArgs(parameter, callback) {
      return this._fetch(t.STANDINGS_ARGS, parameter, callback)
    }

    fetchTeamRedirects(parameter, callback) {
      return this._fetch(t.TEAM_REDIRECTS, parameter, callback)
    }

    fetchTeamRenames(parameter, callback) {
      return this._fetch(t.TEAM_RENAMES, parameter, callback)
    }

    fetchTeams(parameter, callback) {
      return this._fetch(t.TEAMS, parameter, callback)
    }

    fetchTeamsWithAutoRosters(parameter, callback) {
      return this._fetch(t.TEAMS_WITH_AUTO_ROSTERS, parameter, callback)
    }

    fetchTenures(parameter, callback) {
      return this._fetch(t.TENURES, parameter, callback)
    }

    fetchTenuresUnbroken(parameter, callback) {
      return this._fetch(t.TENURES_UNBROKEN, parameter, callback)
    }

    fetchTournamentGroups(parameter, callback) {
      return this._fetch(t.TOURNAMENT_GROUPS, parameter, callback)
    }

    fetchTournamentPlayers(parameter, callback) {
      return this._fetch(t.TOURNAMENT_PLAYERS, parameter, callback)
    }

    fetchTournamentResults(parameter, callback) {
      return this._fetch(t.TOURNAMENT_RESULTS, parameter, callback)
    }

    fetchTournamentResults1v1(parameter, callback) {
      return this._fetch(t.TOURNAMENT_RESULTS_1V1, parameter, callback)
    }

    fetchTournamentRosters(parameter, callback) {
      return this._fetch(t.TOURNAMENT_ROSTERS, parameter, callback)
    }

    fetchTournamentTabs(parameter, callback) {
      return this._fetch(t.TOURNAMENT_TABS, parameter, callback)
    }

    fetchTournaments(parameter, callback) {
      return this._fetch(t.TOURNAMENTS, parameter, callback)
    }

    fetchUserPredictionGroups(parameter, callback) {
      return this._fetch(t.USER_PREDICTION_GROUPS, parameter, callback)
    }

    fetchUserPredictions(parameter, callback) {
      return this._fetch(t.USER_PREDICTIONS, parameter, callback)
    }

    fetchPageData(parameter, callback) {
      return this._fetch(t._PAGE_DATA, parameter, callback)
    }
  }

  module.exports = Poro
})()
