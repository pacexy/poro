type FieldName = string
export type Field = `${Table}.${FieldName}`

export type JoinOn = `${Field}=${Field}`

export interface OrderBy {
  field: Field
  desc?: boolean
}

export interface Parameter {
  tables: Table[]
  fields?: Field[]
  where?: string
  joinOn?: JoinOn[]
  groupBy?: Field[]
  having?: string
  orderBy?: OrderBy[]
  limit?: number
  offset?: number
  format?: string
}

export type Table =
  | 'Alphabets'
  | 'BroadcastMusicTrackTypes'
  | 'BroadcastMusicTracks'
  | 'BroadcastMusicUsages'
  | 'CargoAttachments'
  | 'ChampionFlashcards'
  | 'Champions'
  | 'ChromaSets'
  | 'Chromas'
  | 'Contracts'
  | 'CurrentLeagues'
  | 'Disambiguations'
  | 'Entities'
  | 'ExternalContent'
  | 'GCDArchive'
  | 'Hooks'
  | 'IgnorePagedata'
  | 'IndividualAchievements'
  | 'Items'
  | 'LeagueGroups'
  | 'Leagues'
  | 'ListplayerCurrent'
  | 'LowPriorityRedirects'
  | 'MatchSchedule'
  | 'MatchScheduleGame'
  | 'NASGLadder2018'
  | 'NASGLadder7Cycles'
  | 'NTLGlossary'
  | 'NewsItems'
  | 'Organizations'
  | 'ParticipantsArgs'
  | 'PatchNotes'
  | 'Pentakills'
  | 'PicksAndBansS7'
  | 'PlayerImages'
  | 'PlayerLeagueHistory'
  | 'PlayerPronunciationFiles'
  | 'PlayerRedirects'
  | 'PlayerRenames'
  | 'Players'
  | 'RegionStatuses'
  | 'Regions'
  | 'ResidencyChanges'
  | 'Retirements'
  | 'RosterChangePortalDates'
  | 'RosterChangePortalPages'
  | 'RosterChanges'
  | 'RosterRumors'
  | 'ScoreboardGames'
  | 'ScoreboardPlayers'
  | 'ScoreboardTeams'
  | 'SisterTeams'
  | 'Skins'
  | 'SkinsUsed'
  | 'Standings'
  | 'StandingsArgs'
  | 'TeamRedirects'
  | 'TeamRenames'
  | 'TeamRosterPhotos'
  | 'Teams'
  | 'TeamsWithAutoRosters'
  | 'Tenures'
  | 'TenuresUnbroken'
  | 'TournamentGroups'
  | 'TournamentPlayers'
  | 'TournamentResults'
  | 'TournamentResults1v1'
  | 'TournamentRosters'
  | 'TournamentTabs'
  | 'Tournaments'
  | 'UserPredictionGroups'
  | 'UserPredictions'
  | '_pageData'
