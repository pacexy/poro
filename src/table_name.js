module.exports = {
  CARGO_ATTACHMENTS: 'CargoAttachments',
  CHAMPION_FLASHCARDS: 'ChampionFlashcards',
  CHAMPIONS: 'Champions',
  CHROMA_SETS: 'ChromaSets',
  CHROMAS: 'Chromas',
  CONTRACTS: 'Contracts',
  CURRENT_LEAGUES: 'CurrentLeagues',
  DISAMBIGUATIONS: 'Disambiguations',
  ENTITIES: 'Entities',
  EXTERNAL_CONTENT: 'ExternalContent',
  GCD_ARCHIVE: 'GCDArchive',
  HOOKS: 'Hooks',
  IGNORE_PAGEDATA: 'IgnorePagedata',
  INDIVIDUAL_ACHIEVEMENTS: 'IndividualAchievements',
  ITEMS: 'Items',
  LEAGUE_GROUPS: 'LeagueGroups',
  LEAGUES: 'Leagues',
  LISTPLAYER_CURRENT: 'ListplayerCurrent',
  MATCH_SCHEDULE: 'MatchSchedule',
  MATCH_SCHEDULE_GAME: 'MatchScheduleGame',
  NASG_LADDER_2018: 'NASGLadder2018',
  NTL_GLOSSARY: 'NTLGlossary',
  NEWS_ITEMS: 'NewsItems',
  ORGANIZATIONS: 'Organizations',
  PARTICIPANTS_ARGS: 'ParticipantsArgs',
  PATCH_NOTES: 'PatchNotes',
  PENTAKILLS: 'Pentakills',
  PICKS_AND_BANS_S7: 'PicksAndBansS7',
  PLAYER_IMAGES: 'PlayerImages',
  PLAYER_LEAGUE_HISTORY: 'PlayerLeagueHistory',
  PLAYER_PRONUNCIATION_FILES: 'PlayerPronunciationFiles',
  PLAYER_REDIRECTS: 'PlayerRedirects',
  PLAYER_RENAMES: 'PlayerRenames',
  PLAYERS: 'Players',
  REGION_STATUSES: 'RegionStatuses',
  REGIONS: 'Regions',
  RESIDENCY_CHANGES: 'ResidencyChanges',
  RETIREMENTS: 'Retirements',
  ROSTER_CHANGE_PORTAL_DATES: 'RosterChangePortalDates',
  ROSTER_CHANGE_PORTAL_PAGES: 'RosterChangePortalPages',
  ROSTER_CHANGES: 'RosterChanges',
  ROSTER_RUMORS: 'RosterRumors',
  SCOREBOARD_GAMES: 'ScoreboardGames',
  SCOREBOARD_PLAYERS: 'ScoreboardPlayers',
  SCOREBOARD_TEAMS: 'ScoreboardTeams',
  SISTER_TEAMS: 'SisterTeams',
  SKINS: 'Skins',
  SKINS_USED: 'SkinsUsed',
  STANDINGS_ARGS: 'StandingsArgs',
  TEAM_REDIRECTS: 'TeamRedirects',
  TEAM_RENAMES: 'TeamRenames',
  TEAMS: 'Teams',
  TEAMS_WITH_AUTO_ROSTERS: 'TeamsWithAutoRosters',
  TENURES: 'Tenures',
  TENURES_UNBROKEN: 'TenuresUnbroken',
  TOURNAMENT_GROUPS: 'TournamentGroups',
  TOURNAMENT_PLAYERS: 'TournamentPlayers',
  TOURNAMENT_RESULTS: 'TournamentResults',
  TOURNAMENT_RESULTS_1V1: 'TournamentResults1v1',
  TOURNAMENT_ROSTERS: 'TournamentRosters',
  TOURNAMENT_TABS: 'TournamentTabs',
  TOURNAMENTS: 'Tournaments',
  USER_PREDICTION_GROUPS: 'UserPredictionGroups',
  USER_PREDICTIONS: 'UserPredictions',
  _PAGE_DATA: '_pageData'
}

const fs = require('fs')
const path = require('path')
let data = ''

for (let key in module.exports) {
  data += `
fetch${module.exports[key]}(where, common) {
  return this._fetch(t.${key}, where, common)
}
`
}
fs.writeFileSync(path.resolve(__dirname, './f.js'), data)