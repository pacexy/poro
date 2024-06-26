import { Queue, Tier, Division } from './enums'

// not mentioned in the docs
export type NotMentioned = any
export type ChallengeInfo = NotMentioned
export type ChallengePonumbers = NotMentioned
export type PlayerClientPreferences = NotMentioned
export type ActiveShardDto = NotMentioned
export type MatchTimelineDto = NotMentioned

// #region ACCOUNT-V1
export type AccountDto = {
  puuid: string
  /* This field may be excluded from the response if the account doesn't have a gameName. */
  gameName: string
  /* This field may be excluded from the response if the account doesn't have a tagLine. */
  tagLine: string
}
// #endregion

// #region CHAMPION-MASTERY-V4
/* This object contains single Champion Mastery information for player and champion combination. */
export type ChampionMasteryDto = {
  /* Player Universal Unique Identifier. Exact length of 78 characters. (Encrypted) */
  puuid: string
  /* Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion. */
  championPointsUntilNextLevel: number
  /* Is chest granted for this champion or not in current season. */
  chestGranted: boolean
  /* Champion ID for this entry. */
  championId: number
  /* Last time this champion was played by this player - in Unix milliseconds time format. */
  lastPlayTime: number
  /* Champion level for specified player and champion combination. */
  championLevel: number
  /* Summoner ID for this entry. (Encrypted) */
  summonerId: string
  /* Total number of champion points for this player and champion combination - they are used to determine championLevel. */
  championPoints: number
  /* Number of points earned since current level has been achieved. */
  championPointsSinceLastLevel: number
  /* The token earned for this champion at the current championLevel. When the championLevel is advanced the tokensEarned resets to 0. */
  tokensEarned: number
}
// #endregion

// #region CHAMPION-V3
export type ChampionInfo = {
  maxNewPlayerLevel: number
  freeChampionIdsForNewPlayers: number[]
  freeChampionIds: number[]
}
// #endregion

// #region CLASH-V1
export type PlayerDto = {
  summonerId: string
  /* (Legal values: UNSELECTED, FILL, TOP, JUNGLE, MIDDLE, BOTTOM, UTILITY) */
  position: string
  /* (Legal values: CAPTAIN, MEMBER) */
  role: string
}

export type ClashTeamDto = {
  id: string
  tournamentId: number
  name: string
  iconId: number
  tier: Tier
  /* Summoner ID of the team captain. */
  captain: string
  abbreviation: string
  /* Team members. */
  players: PlayerDto[]
}

export type TournamentDto = {
  id: number
  themeId: number
  nameKey: string
  nameKeySecondary: string
  /* Tournament phase. */
  schedule: TournamentPhaseDto[]
}

export type TournamentPhaseDto = {
  id: number
  registrationTime: number
  startTime: number
  cancelled: boolean
}
// #endregion

// #region LEAGUE-EXP-V4
export type LeagueEntryDTO = {
  leagueId: string
  /* Player's summonerId (Encrypted) */
  summonerId: string
  summonerName: string
  queueType: Queue
  tier: Tier
  /* The player's division within a tier. */
  rank: Division
  leaguePoints: number
  /* Winning team on Summoners Rift. First placement in Teamfight Tactics. */
  wins: number
  /* Losing team on Summoners Rift. Second through eighth placement in Teamfight Tactics. */
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries?: MiniSeriesDTO
}

export type MiniSeriesDTO = {
  losses: number
  progress: string
  target: number
  wins: number
}
// #endregion

// #region LEAGUE-V4
export type LeagueListDTO = {
  leagueId: string
  entries: LeagueItemDTO[]
  tier: Tier
  name: string
  queue: Queue
}

export type LeagueItemDTO = {
  freshBlood: boolean
  /* Winning team on Summoners Rift. */
  wins: number
  summonerName: string
  miniSeries: MiniSeriesDTO
  inactive: boolean
  veteran: boolean
  hotStreak: boolean
  rank: Division
  leaguePoints: number
  /* Losing team on Summoners Rift. */
  losses: number
  /* Player's encrypted summonerId. */
  summonerId: string
}
// #endregion

// #region LOL-CHALLENGES-V1
export type ChallengeConfigInfoDto = {
  id: number
  localizedNames: Record<string, Record<string, string>>
  state: State
  tracking: Tracking
  startTimestamp: number
  endTimestamp: number
  leaderboard: boolean
  thresholds: Record<string, number>
}

/* DISABLED - not visible and not calculated,
HIDDEN - not visible, but calculated,
ENABLED - visible and calculated,
ARCHIVED - visible, but not calculated */
export type State = NotMentioned

/* LIFETIME - stats are incremented without reset,
SEASON - stats are accumulated by season and reset at the beginning of new season */
export type Tracking = NotMentioned

export type ApexPlayerInfoDto = {
  puuid: string
  value: number
  position: number
}

/* 0 NONE,
1 IRON,
2 BRONZE,
3 SILVER,
4 GOLD,
5 PLATINUM,
6 DIAMOND,
7 MASTER,
8 GRANDMASTER,
9 CHALLENGER */
export type Level = NotMentioned

export type PlayerInfoDto = {
  challenges: ChallengeInfo[]
  preferences: PlayerClientPreferences
  totalPoints: ChallengePonumbers
  categoryPoints: Record<string, ChallengePonumbers>
}
// #endregion

// #region LOL-STATUS-V4
export type PlatformDataDto = {
  id: string
  name: string
  locales: string[]
  maintenances: StatusDto[]
  incidents: StatusDto[]
}

export type StatusDto = {
  id: number
  /* (Legal values: scheduled, in_progress, complete) */
  maintenance_status: string
  /* (Legal values: info, warning, critical) */
  incident_severity: string
  titles: ContentDto[]
  updates: UpdateDto[]
  created_at: string
  archive_at: string
  updated_at: string
  /* (Legal values: windows, macos, android, ios, ps4, xbone, switch) */
  platforms: string[]
}

export type ContentDto = {
  locale: string
  content: string
}

export type UpdateDto = {
  id: number
  author: string
  publish: boolean
  /* (Legal values: riotclient, riotstatus, game) */
  publish_locations: string[]
  translations: ContentDto[]
  created_at: string
  updated_at: string
}
// #endregion

// #region MATCH-V5
export type MatchDto = {
  /* Match metadata. */
  metadata: MetadataDto
  /* Match info. */
  info: InfoDto
}

export type MetadataDto = {
  /* Match data version. */
  dataVersion: string
  /* Match id. */
  matchId: string
  /* A list of participant PUUIDs. */
  participants: string[]
}

export type InfoDto = {
  /* Refer to indicate if the game ended in termination. */
  endOfGameResult: string
  /* Unix timestamp for when the game is created on the game server (i.e., the loading screen). */
  gameCreation: number
  /* Prior to patch 11.20, this field returns the game length in milliseconds calculated from gameEndTimestamp - gameStartTimestamp. Post patch 11.20, this field returns the max timePlayed of any participant in the game in seconds, which makes the behavior of this field consistent with that of match-v4. The best way to handling the change in this field is to treat the value as milliseconds if the gameEndTimestamp field isn't in the response and to treat the value as seconds if gameEndTimestamp is in the response. */
  gameDuration: number
  /* Unix timestamp for when match ends on the game server. This timestamp can occasionally be significantly longer than when the match "ends". The most reliable way of determining the timestamp for the end of the match would be to add the max time played of any participant to the gameStartTimestamp. This field was added to match-v5 in patch 11.20 on Oct 5th, 2021. */
  gameEndTimestamp: number
  gameId: number
  /* Refer to the Game Constants documentation. */
  gameMode: string
  gameName: string
  /* Unix timestamp for when match starts on the game server. */
  gameStartTimestamp: number
  gameType: string
  /* The first two parts can be used to determine the patch a game was played on. */
  gameVersion: string
  /* Refer to the Game Constants documentation. */
  mapId: number
  participants: ParticipantDto[]
  /* Platform where the match was played. */
  platformId: string
  /* Refer to the Game Constants documentation. */
  queueId: number
  teams: TeamDto[]
  /* Tournament code used to generate the match. This field was added to match-v5 in patch 11.13 on June 23rd, 2021. */
  tournamentCode: string
}

export type ParticipantDto = {
  assists: number
  baronKills: number
  bountyLevel: number
  champExperience: number
  champLevel: number
  /* Prior to patch 11.4, on Feb 18th, 2021, this field returned invalid championIds. We recommend determining the champion based on the championName field for matches played prior to patch 11.4. */
  championId: number
  championName: string
  /* This field is currently only utilized for Kayn's transformations. (Legal values: 0 - None, 1 - Slayer, 2 - Assassin) */
  championTransform: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  goldEarned: number
  goldSpent: number
  /* Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
  individualPosition: string
  inhibitorKills: number
  inhibitorTakedowns: number
  inhibitorsLost: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number
  killingSprees: number
  kills: number
  lane: string
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicDamageTaken: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusTakedowns: number
  nexusLost: number
  objectivesStolen: number
  objectivesStolenAssists: number
  participantId: number
  pentaKills: number
  perks: PerksDto
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  playerAugment1: number
  playerAugment2: number
  playerAugment3: number
  playerAugment4: number
  playerSubteamId: number
  profileIcon: number
  puuid: string
  quadraKills: number
  riotIdName: string
  riotIdTagline: string
  role: string
  sightWardsBoughtInGame: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  summoner1Casts: number
  summoner1Id: number
  summoner2Casts: number
  summoner2Id: number
  summonerId: string
  summonerLevel: number
  summonerName: string
  teamEarlySurrendered: boolean
  teamId: number
  /* Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field. */
  teamPosition: string
  timeCCingOthers: number
  timePlayed: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
  totalDamageTaken: number
  totalHeal: number
  totalHealsOnTeammates: number
  totalMinionsKilled: number
  totalTimeCCDealt: number
  totalTimeSpentDead: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  turretTakedowns: number
  turretsLost: number
  unrealKills: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

export type PerksDto = {
  statPerks: PerkStatsDto
  styles: PerkStyleDto[]
}

export type PerkStatsDto = {
  defense: number
  flex: number
  offense: number
}

export type PerkStyleDto = {
  description: string
  selections: PerkStyleSelectionDto[]
  style: number
}

export type PerkStyleSelectionDto = {
  perk: number
  var1: number
  var2: number
  var3: number
}

export type TeamDto = {
  bans: BanDto[]
  objectives: ObjectivesDto
  teamId: number
  win: boolean
}

export type BanDto = {
  championId: number
  pickTurn: number
}

export type ObjectivesDto = {
  baron: ObjectiveDto
  champion: ObjectiveDto
  dragon: ObjectiveDto
  inhibitor: ObjectiveDto
  riftHerald: ObjectiveDto
  tower: ObjectiveDto
}

export type ObjectiveDto = {
  first: boolean
  kills: number
}
// #endregion

// #region SPECTATOR-V5
export type CurrentGameInfo = {
  /* The ID of the game */
  gameId: number
  /* The game type */
  gameType: string
  /* The game start time represented in epoch milliseconds */
  gameStartTime: number
  /* The ID of the map */
  mapId: number
  /* The amount of time in seconds that has passed since the game started */
  gameLength: number
  /* The ID of the platform on which the game is being played */
  platformId: string
  /* The game mode */
  gameMode: string
  /* Banned champion information */
  bannedChampions: BannedChampion[]
  /* The queue type (queue types are documented on the Game Constants page) */
  gameQueueConfigId?: number
  /* The observer information */
  observers: Observer
  /* The participant information */
  participants: CurrentGameParticipant[]
}

export type BannedChampion = {
  /* The turn during which the champion was banned */
  pickTurn: number
  /* The ID of the banned champion */
  championId: number
  /* The ID of the team that banned the champion */
  teamId: number
}

export type Observer = {
  /* Key used to decrypt the spectator grid game data for playback */
  encryptionKey: string
}

export type CurrentGameParticipant = {
  /* The ID of the champion played by this participant */
  championId: number
  /* Perks/Runes Reforged Information */
  perks: Perks
  /* The ID of the profile icon used by this participant */
  profileIconId: number
  /* Flag indicating whether or not this participant is a bot */
  bot: boolean
  /* The team ID of this participant, indicating the participant's team */
  teamId: number
  /* The summoner name of this participant */
  summonerName: string
  /* The encrypted summoner ID of this participant */
  summonerId: string
  /* The encrypted puuid of this participant */
  puuid: string
  /* The ID of the first summoner spell used by this participant */
  spell1Id: number
  /* The ID of the second summoner spell used by this participant */
  spell2Id: number
  /* List of Game Customizations */
  gameCustomizationObjects: GameCustomizationObject[]
}

export type Perks = {
  /* IDs of the perks/runes assigned. */
  perkIds: number[]
  /* Primary runes path */
  perkStyle: number
  /* Secondary runes path */
  perkSubStyle: number
}

export type GameCustomizationObject = {
  /* Category identifier for Game Customization */
  category: string
  /* Game Customization content */
  content: string
}

export type FeaturedGames = {
  /* The list of featured games */
  gameList: FeaturedGameInfo[]
  /* The suggested interval to wait before requesting FeaturedGames again */
  clientRefreshInterval: number
}

export type FeaturedGameInfo = {
  /* The game mode
 (Legal values: CLASSIC, ODIN, ARAM, TUTORIAL, ONEFORALL, ASCENSION, FIRSTBLOOD, KINGPORO) */
  gameMode: string
  /* The amount of time in seconds that has passed since the game started */
  gameLength: number
  /* The ID of the map */
  mapId: number
  /* The game type
 (Legal values: CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME) */
  gameType: string
  /* Banned champion information */
  bannedChampions: BannedChampion[]
  /* The ID of the game */
  gameId: number
  /* The observer information */
  observers: Observer
  /* The queue type (queue types are documented on the Game Constants page) */
  gameQueueConfigId: number
  /* The participant information */
  participants: Participant[]
  /* The ID of the platform on which the game is being played */
  platformId: string
}

export type Participant = {
  /* Flag indicating whether or not this participant is a bot */
  bot: boolean
  /* The ID of the second summoner spell used by this participant */
  spell2Id: number
  /* The ID of the profile icon used by this participant */
  profileIconId: number
  /* The summoner name of this participant */
  summonerName: string
  /* Encrypted summoner ID of this participant */
  summonerId: string
  /* Encrypted puuid of this participant */
  puuid: string
  /* The ID of the champion played by this participant */
  championId: number
  /* The team ID of this participant, indicating the participant's team */
  teamId: number
  /* The ID of the first summoner spell used by this participant */
  spell1Id: number
}
// #endregion

// #region SUMMONER-V4
/* represents a summoner */
export type SummonerDTO = {
  /* Encrypted account ID. Max length 56 characters. */
  accountId: string
  /* ID of the summoner icon associated with the summoner. */
  profileIconId: number
  /* Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: summoner name change, summoner level change, or profile icon change. */
  revisionDate: number
  /* Summoner name. */
  name: string
  /* Encrypted summoner ID. Max length 63 characters. */
  id: string
  /* Encrypted PUUID. Exact length of 78 characters. */
  puuid: string
  /* Summoner level associated with the summoner. */
  summonerLevel: number
}
// #endregion
