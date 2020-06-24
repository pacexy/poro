(function(){
  const { to } = require('await-to-js')

  const { lp } = require('./request')
  const { generateURL } = require('./leaguepedia')
  const { getType } = require('./util')
  const t = require('./table_name')

  class Poro {
    constructor() {
    }
    
    async _fetch(table, where, common, callback) {
      const shouldUseCallback = getType(callback) === 'Function'

        const [err, res] = await to(lp.get(generateURL(table, where, common)))
        if (err) {
          if (shouldUseCallback) callback(err, null) 
          throw err
        }

        if (shouldUseCallback) callback(null, res.data)

        return res.data
    }

    fetchCargoAttachments(where, common, callback) {
      return this._fetch(t.CARGO_ATTACHMENTS, where, common, callback)
    }

    fetchChampionFlashcards(where, common, callback) {
      return this._fetch(t.CHAMPION_FLASHCARDS, where, common, callback)
    }

    fetchChampions(where, common, callback) {
      return this._fetch(t.CHAMPIONS, where, common, callback)
    }

    fetchChromaSets(where, common, callback) {
      return this._fetch(t.CHROMA_SETS, where, common, callback)
    }

    fetchChromas(where, common, callback) {
      return this._fetch(t.CHROMAS, where, common, callback)
    }

    fetchContracts(where, common, callback) {
      return this._fetch(t.CONTRACTS, where, common, callback)
    }

    fetchCurrentLeagues(where, common, callback) {
      return this._fetch(t.CURRENT_LEAGUES, where, common, callback)
    }

    fetchDisambiguations(where, common, callback) {
      return this._fetch(t.DISAMBIGUATIONS, where, common, callback)
    }

    fetchEntities(where, common, callback) {
      return this._fetch(t.ENTITIES, where, common, callback)
    }

    fetchExternalContent(where, common, callback) {
      return this._fetch(t.EXTERNAL_CONTENT, where, common, callback)
    }

    fetchGCDArchive(where, common, callback) {
      return this._fetch(t.GCD_ARCHIVE, where, common, callback)
    }

    fetchHooks(where, common, callback) {
      return this._fetch(t.HOOKS, where, common, callback)
    }

    fetchIgnorePagedata(where, common, callback) {
      return this._fetch(t.IGNORE_PAGEDATA, where, common, callback)
    }

    fetchIndividualAchievements(where, common, callback) {
      return this._fetch(t.INDIVIDUAL_ACHIEVEMENTS, where, common, callback)
    }

    fetchItems(where, common, callback) {
      return this._fetch(t.ITEMS, where, common, callback)
    }

    fetchLeagueGroups(where, common, callback) {
      return this._fetch(t.LEAGUE_GROUPS, where, common, callback)
    }

    fetchLeagues(where, common, callback) {
      return this._fetch(t.LEAGUES, where, common, callback)
    }

    fetchListplayerCurrent(where, common, callback) {
      return this._fetch(t.LISTPLAYER_CURRENT, where, common, callback)
    }

    fetchMatchSchedule(where, common, callback) {
      return this._fetch(t.MATCH_SCHEDULE, where, common, callback)
    }

    fetchMatchScheduleGame(where, common, callback) {
      return this._fetch(t.MATCH_SCHEDULE_GAME, where, common, callback)
    }

    fetchNASGLadder2018(where, common, callback) {
      return this._fetch(t.NASG_LADDER_2018, where, common, callback)
    }

    fetchNTLGlossary(where, common, callback) {
      return this._fetch(t.NTL_GLOSSARY, where, common, callback)
    }

    fetchNewsItems(where, common, callback) {
      return this._fetch(t.NEWS_ITEMS, where, common, callback)
    }

    fetchOrganizations(where, common, callback) {
      return this._fetch(t.ORGANIZATIONS, where, common, callback)
    }

    fetchParticipantsArgs(where, common, callback) {
      return this._fetch(t.PARTICIPANTS_ARGS, where, common, callback)
    }

    fetchPatchNotes(where, common, callback) {
      return this._fetch(t.PATCH_NOTES, where, common, callback)
    }

    fetchPentakills(where, common, callback) {
      return this._fetch(t.PENTAKILLS, where, common, callback)
    }

    fetchPicksAndBansS7(where, common, callback) {
      return this._fetch(t.PICKS_AND_BANS_S7, where, common, callback)
    }

    fetchPlayerImages(where, common, callback) {
      return this._fetch(t.PLAYER_IMAGES, where, common, callback)
    }

    fetchPlayerLeagueHistory(where, common, callback) {
      return this._fetch(t.PLAYER_LEAGUE_HISTORY, where, common, callback)
    }

    fetchPlayerPronunciationFiles(where, common, callback) {
      return this._fetch(t.PLAYER_PRONUNCIATION_FILES, where, common, callback)
    }

    fetchPlayerRedirects(where, common, callback) {
      return this._fetch(t.PLAYER_REDIRECTS, where, common, callback)
    }

    fetchPlayerRenames(where, common, callback) {
      return this._fetch(t.PLAYER_RENAMES, where, common, callback)
    }

    fetchPlayers(where, common, callback) {
      return this._fetch(t.PLAYERS, where, common, callback)
    }

    fetchRegionStatuses(where, common, callback) {
      return this._fetch(t.REGION_STATUSES, where, common, callback)
    }

    fetchRegions(where, common, callback) {
      return this._fetch(t.REGIONS, where, common, callback)
    }

    fetchResidencyChanges(where, common, callback) {
      return this._fetch(t.RESIDENCY_CHANGES, where, common, callback)
    }

    fetchRetirements(where, common, callback) {
      return this._fetch(t.RETIREMENTS, where, common, callback)
    }

    fetchRosterChangePortalDates(where, common, callback) {
      return this._fetch(t.ROSTER_CHANGE_PORTAL_DATES, where, common, callback)
    }

    fetchRosterChangePortalPages(where, common, callback) {
      return this._fetch(t.ROSTER_CHANGE_PORTAL_PAGES, where, common, callback)
    }

    fetchRosterChanges(where, common, callback) {
      return this._fetch(t.ROSTER_CHANGES, where, common, callback)
    }

    fetchRosterRumors(where, common, callback) {
      return this._fetch(t.ROSTER_RUMORS, where, common, callback)
    }

    fetchScoreboardGames(where, common, callback) {
      return this._fetch(t.SCOREBOARD_GAMES, where, common, callback)
    }

    fetchScoreboardPlayers(where, common, callback) {
      return this._fetch(t.SCOREBOARD_PLAYERS, where, common, callback)
    }

    fetchScoreboardTeams(where, common, callback) {
      return this._fetch(t.SCOREBOARD_TEAMS, where, common, callback)
    }

    fetchSisterTeams(where, common, callback) {
      return this._fetch(t.SISTER_TEAMS, where, common, callback)
    }

    fetchSkins(where, common, callback) {
      return this._fetch(t.SKINS, where, common, callback)
    }

    fetchSkinsUsed(where, common, callback) {
      return this._fetch(t.SKINS_USED, where, common, callback)
    }

    fetchStandingsArgs(where, common, callback) {
      return this._fetch(t.STANDINGS_ARGS, where, common, callback)
    }

    fetchTeamRedirects(where, common, callback) {
      return this._fetch(t.TEAM_REDIRECTS, where, common, callback)
    }

    fetchTeamRenames(where, common, callback) {
      return this._fetch(t.TEAM_RENAMES, where, common, callback)
    }

    fetchTeams(where, common, callback) {
      return this._fetch(t.TEAMS, where, common, callback)
    }

    fetchTeamsWithAutoRosters(where, common, callback) {
      return this._fetch(t.TEAMS_WITH_AUTO_ROSTERS, where, common, callback)
    }

    fetchTenures(where, common, callback) {
      return this._fetch(t.TENURES, where, common, callback)
    }

    fetchTenuresUnbroken(where, common, callback) {
      return this._fetch(t.TENURES_UNBROKEN, where, common, callback)
    }

    fetchTournamentGroups(where, common, callback) {
      return this._fetch(t.TOURNAMENT_GROUPS, where, common, callback)
    }

    fetchTournamentPlayers(where, common, callback) {
      return this._fetch(t.TOURNAMENT_PLAYERS, where, common, callback)
    }

    fetchTournamentResults(where, common, callback) {
      return this._fetch(t.TOURNAMENT_RESULTS, where, common, callback)
    }

    fetchTournamentResults1v1(where, common, callback) {
      return this._fetch(t.TOURNAMENT_RESULTS_1V1, where, common, callback)
    }

    fetchTournamentRosters(where, common, callback) {
      return this._fetch(t.TOURNAMENT_ROSTERS, where, common, callback)
    }

    fetchTournamentTabs(where, common, callback) {
      return this._fetch(t.TOURNAMENT_TABS, where, common, callback)
    }

    fetchTournaments(where, common, callback) {
      return this._fetch(t.TOURNAMENTS, where, common, callback)
    }

    fetchUserPredictionGroups(where, common, callback) {
      return this._fetch(t.USER_PREDICTION_GROUPS, where, common, callback)
    }

    fetchUserPredictions(where, common, callback) {
      return this._fetch(t.USER_PREDICTIONS, where, common, callback)
    }

    fetchPageData(where, common, callback) {
      return this._fetch(t._PAGE_DATA, where, common, callback)
    }
  }

  module.exports = Poro
})()
