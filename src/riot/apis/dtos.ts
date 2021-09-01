import { Queue, Tier, Division } from './enums'

export type AccountDto = {
  puuid: string
  /** This field may be excluded from the response if the account doesn't have a gameName. */
  gameName: string
  /** This field may be excluded from the response if the account doesn't have a tagLine. */
  tagLine: string
}
/** This object contains single Champion Mastery information for player and champion combination. */
export type ChampionMasteryDto = {
  /** Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion. */
  championPointsUntilNextLevel: number
  /** Is chest granted for this champion or not in current season. */
  chestGranted: boolean
  /** Champion ID for this entry. */
  championId: number
  /** Last time this champion was played by this player - in Unix milliseconds time format. */
  lastPlayTime: number
  /** Champion level for specified player and champion combination. */
  championLevel: number
  /** Summoner ID for this entry. (Encrypted) */
  summonerId: string
  /** Total number of champion points for this player and champion combination - they are used to determine championLevel. */
  championPoints: number
  /** Number of points earned since current level has been achieved. */
  championPointsSinceLastLevel: number
  /** The token earned for this champion at the current championLevel. When the championLevel is advanced the tokensEarned resets to 0. */
  tokensEarned: number
}

export type ChampionInfo = {
  maxNewPlayerLevel: number
  freeChampionIdsForNewPlayers: number[]
  freeChampionIds: number[]
}

export type PlayerDto = {
  summonerId: string
  /** (Legal values:  UNSELECTED,  FILL,  TOP,  JUNGLE,  MIDDLE,  BOTTOM,  UTILITY) */
  position: string
  /** (Legal values:  CAPTAIN,  MEMBER) */
  role: string
}

export type TeamDto = {
  id: string
  tournamentId: number
  name: string
  iconId: number
  tier: number
  /** Summoner ID of the team captain. */
  captain: string
  abbreviation: string
  /** Team members. */
  players: PlayerDto[]
}

export type TournamentDto = {
  id: number
  themeId: number
  nameKey: string
  nameKeySecondary: string
  /** Tournament phase. */
  schedule: TournamentPhaseDto[]
}

export type TournamentPhaseDto = {
  id: number
  registrationTime: number
  startTime: number
  cancelled: boolean
}

export type LeagueEntryDTO = {
  leagueId: string
  /** Player's summonerId (Encrypted) */
  summonerId: string
  summonerName: string
  queueType: Queue
  tier: Tier
  /** The player's division within a tier. */
  rank: Division
  leaguePoints: number
  /** Winning team on Summoners Rift. First placement in Teamfight Tactics. */
  wins: number
  /** Losing team on Summoners Rift. Second through eighth placement in Teamfight Tactics. */
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

export type LeagueListDTO = {
  leagueId: string
  entries: LeagueItemDTO[]
  tier: Tier
  name: string
  queue: Queue
}

export type LeagueItemDTO = {
  freshBlood: boolean
  /** Winning team on Summoners Rift. */
  wins: number
  summonerName: string
  miniSeries: MiniSeriesDTO
  inactive: boolean
  veteran: boolean
  hotStreak: boolean
  rank: Division
  leaguePoints: number
  /** Losing team on Summoners Rift. */
  losses: number
  /** Player's encrypted summonerId. */
  summonerId: string
}

export type PlatformDataDto = {
  id: string
  name: string
  locales: string[]
  maintenances: StatusDto[]
  incidents: StatusDto[]
}

export type StatusDto = {
  id: number
  /** (Legal values:  scheduled,  in_progress,  complete) */
  maintenance_status: string
  /** (Legal values:  info,  warning,  critical) */
  incident_severity: string
  titles: ContentDto[]
  updates: UpdateDto[]
  created_at: string
  archive_at: string
  updated_at: string
  /** (Legal values: windows, macos, android, ios, ps4, xbone, switch) */
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
  /** (Legal values: riotclient, riotstatus, game) */
  publish_locations: string[]
  translations: ContentDto[]
  created_at: string
  updated_at: string
}

export type MatchDto = {
  gameId: number
  /** Participant identity information. Participant identity information is purposefully excluded for custom games. */
  participantIdentities: ParticipantIdentityDto[]
  /** Please refer to the Game Constants documentation. */
  queueId: number
  /** Please refer to the Game Constants documentation. */
  gameType: string
  /** Match duration in seconds. */
  gameDuration: number
  /** Team information. */
  teams: TeamStatsDto[]
  /** Platform where the match was played. */
  platformId: string
  /** Designates the timestamp when champion select ended and the loading screen appeared, NOT when the game timer was at 0:00. */
  gameCreation: number
  /** Please refer to the Game Constants documentation. */
  seasonId: number
  /** The major.minor version typically indicates the patch the match was played on. */
  gameVersion: string
  /** Please refer to the Game Constants documentation. */
  mapId: number
  /** Please refer to the Game Constants documentation. */
  gameMode: string
  /** Participant information. */
  participants: ParticipantDto[]
}

export type ParticipantIdentityDto = {
  participantId: number
  /** Player information not included in the response for custom matches. Custom matches are considered private unless a tournament code was used to create the match. */
  player: {
    profileIcon: number
    /** Player's original accountId. */
    accountId: string
    matchHistoryUri: string
    /** Player's current accountId when the match was played. */
    currentAccountId: string
    /** Player's current platformId when the match was played. */
    currentPlatformId: string
    summonerName: string
    /** Player's summonerId (Encrypted) */
    summonerId: string
    /** Player's original platformId. */
    platformId: string
  }
}

export type TeamStatsDto = {
  /** Number of towers the team destroyed. */
  towerKills: number
  /** Number of times the team killed Rift Herald. */
  riftHeraldKills: number
  /** Flag indicating whether or not the team scored the first blood. */
  firstBlood: boolean
  /** Number of inhibitors the team destroyed. */
  inhibitorKills: number
  /** If match queueId has a draft, contains banned champion data, otherwise empty. */
  bans: TeamBansDto[]
  /** Flag indicating whether or not the team scored the first Baron kill. */
  firstBaron: boolean
  /** Flag indicating whether or not the team scored the first Dragon kill. */
  firstDragon: boolean
  /** For Dominion matches, specifies the points the team had at game end. */
  dominionVictoryScore: number
  /** Number of times the team killed Dragon. */
  dragonKills: number
  /** Number of times the team killed Baron. */
  baronKills: number
  /** Flag indicating whether or not the team destroyed the first inhibitor. */
  firstInhibitor: boolean
  /** Flag indicating whether or not the team destroyed the first tower. */
  firstTower: boolean
  /** Number of times the team killed Vilemaw. */
  vilemawKills: number
  /** Flag indicating whether or not the team scored the first Rift Herald kill. */
  firstRiftHerald: boolean
  /** 100 for blue side. 200 for red side. */
  teamId: number
  /** String indicating whether or not the team won. There are only two values visibile in public match history. (Legal values:  Fail,  Win) */
  win: string
}

export type TeamBansDto = {
  /** Banned championId. */
  championId: number
  /** Turn during which the champion was banned. */
  pickTurn: number
}

export type ParticipantDto = {
  participantId: number
  championId: number
  /** List of legacy Rune information. Not included for matches played with Runes Reforged. */
  runes: RuneDto[]
  /** Participant statistics. */
  stats: ParticipantStatsDto
  /** 100 for blue side. 200 for red side. */
  teamId: number
  /** Participant timeline data. */
  timeline: ParticipantTimelineDto
  /** First Summoner Spell id. */
  spell1Id: number
  /** Second Summoner Spell id. */
  spell2Id: number
  /** Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation. (Legal values:  CHALLENGER,  MASTER,  DIAMOND,  PLATINUM,  GOLD,  SILVER,  BRONZE,  UNRANKED) */
  highestAchievedSeasonTier: string
  /** List of legacy Mastery information. Not included for matches played with Runes Reforged. */
  masteries: MasteryDto[]
}

export type RuneDto = {
  runeId: number
  rank: number
}

export type ParticipantStatsDto = {
  item0: number
  item2: number
  totalUnitsHealed: number
  item1: number
  largestMultiKill: number
  goldEarned: number
  firstInhibitorKill: boolean
  physicalDamageTaken: number
  nodeNeutralizeAssist: number
  totalPlayerScore: number
  champLevel: number
  damageDealtToObjectives: number
  totalDamageTaken: number
  neutralMinionsKilled: number
  deaths: number
  tripleKills: number
  magicDamageDealtToChampions: number
  wardsKilled: number
  pentaKills: number
  damageSelfMitigated: number
  largestCriticalStrike: number
  nodeNeutralize: number
  totalTimeCrowdControlDealt: number
  firstTowerKill: boolean
  magicDamageDealt: number
  totalScoreRank: number
  nodeCapture: number
  wardsPlaced: number
  totalDamageDealt: number
  timeCCingOthers: number
  magicalDamageTaken: number
  largestKillingSpree: number
  totalDamageDealtToChampions: number
  physicalDamageDealtToChampions: number
  neutralMinionsKilledTeamJungle: number
  totalMinionsKilled: number
  firstInhibitorAssist: boolean
  visionWardsBoughtInGame: number
  objectivePlayerScore: number
  kills: number
  firstTowerAssist: boolean
  combatPlayerScore: number
  inhibitorKills: number
  turretKills: number
  participantId: number
  trueDamageTaken: number
  firstBloodAssist: boolean
  nodeCaptureAssist: number
  assists: number
  teamObjective: number
  altarsNeutralized: number
  goldSpent: number
  damageDealtToTurrets: number
  altarsCaptured: number
  win: boolean
  totalHeal: number
  unrealKills: number
  visionScore: number
  physicalDamageDealt: number
  firstBloodKill: boolean
  longestTimeSpentLiving: number
  killingSprees: number
  sightWardsBoughtInGame: number
  trueDamageDealtToChampions: number
  neutralMinionsKilledEnemyJungle: number
  doubleKills: number
  trueDamageDealt: number
  quadraKills: number
  item4: number
  item3: number
  item6: number
  item5: number
  playerScore0: number
  playerScore1: number
  playerScore2: number
  playerScore3: number
  playerScore4: number
  playerScore5: number
  playerScore6: number
  playerScore7: number
  playerScore8: number
  playerScore9: number
  /** Primary path keystone rune. */
  perk0: number
  /** Post game rune stats. */
  perk0Var1: number
  /** Post game rune stats. */
  perk0Var2: number
  /** Post game rune stats. */
  perk0Var3: number
  /** Primary path rune. */
  perk1: number
  /** Post game rune stats. */
  perk1Var1: number
  /** Post game rune stats. */
  perk1Var2: number
  /** Post game rune stats. */
  perk1Var3: number
  /** Primary path rune. */
  perk2: number
  /** Post game rune stats. */
  perk2Var1: number
  /** Post game rune stats. */
  perk2Var2: number
  /** Post game rune stats. */
  perk2Var3: number
  /** Primary path rune. */
  perk3: number
  /** Post game rune stats. */
  perk3Var1: number
  /** Post game rune stats. */
  perk3Var2: number
  /** Post game rune stats. */
  perk3Var3: number
  /** Secondary path rune. */
  perk4: number
  /** Post game rune stats. */
  perk4Var1: number
  /** Post game rune stats. */
  perk4Var2: number
  /** Post game rune stats. */
  perk4Var3: number
  /** Secondary path rune. */
  perk5: number
  /** Post game rune stats. */
  perk5Var1: number
  /** Post game rune stats. */
  perk5Var2: number
  /** Post game rune stats. */
  perk5Var3: number
  /** Primary rune path */
  perkPrimaryStyle: number
  /** Secondary rune path */
  perkSubStyle: number
  /** Stat rune */
  statPerk0: number
  /** Stat rune */
  statPerk1: number
  /** Stat rune */
  statPerk2: number
}

export type ParticipantTimelineDto = {
  participantId: number
  /** Creep score difference versus the calculated lane opponent(s) for a specified period. */
  csDiffPerMinDeltas: Record<string, number>
  /** Damage taken for a specified period. */
  damageTakenPerMinDeltas: Record<string, number>
  /** Participant's calculated role. (Legal values:  DUO,  NONE,  SOLO,  DUO_CARRY,  DUO_SUPPORT) */
  role: string
  /** Damage taken difference versus the calculated lane opponent(s) for a specified period. */
  damageTakenDiffPerMinDeltas: Record<string, number>
  /** Experience change for a specified period. */
  xpPerMinDeltas: Record<string, number>
  /** Experience difference versus the calculated lane opponent(s) for a specified period. */
  xpDiffPerMinDeltas: Record<string, number>
  /** Participant's calculated lane. MID and BOT are legacy values. (Legal values:  MID,  MIDDLE,  TOP,  JUNGLE,  BOT,  BOTTOM) */
  lane: string
  /** Creeps for a specified period. */
  creepsPerMinDeltas: Record<string, number>
  /** Gold for a specified period. */
  goldPerMinDeltas: Record<string, number>
}

export type MasteryDto = {
  rank: number
  masteryId: number
}

export type MatchTimelineDto = {
  frames: MatchFrameDto[]
  frameInterval: number
}

export type MatchFrameDto = {
  participantFrames: Record<string, MatchParticipantFrameDto>
  events: MatchEventDto[]
  timestamp: number
}

export type MatchParticipantFrameDto = {
  participantId: number
  minionsKilled: number
  teamScore: number
  dominionScore: number
  totalGold: number
  level: number
  xp: number
  currentGold: number
  position: MatchPositionDto
  jungleMinionsKilled: number
}

export type MatchPositionDto = {
  x: number
  y: number
}

export type MatchEventDto = {
  laneType: string
  skillSlot: number
  ascendedType: string
  creatorId: number
  afterId: number
  eventType: string
  /** (Legal values:  CHAMPION_KILL,  WARD_PLACED,  WARD_KILL,  BUILDING_KILL,  ELITE_MONSTER_KILL,  ITEM_PURCHASED,  ITEM_SOLD,  ITEM_DESTROYED,  ITEM_UNDO,  SKILL_LEVEL_UP,  ASCENDED_EVENT,  CAPTURE_POINT,  PORO_KING_SUMMON) */
  type: string
  levelUpType: string
  wardType: string
  participantId: number
  towerType: string
  itemId: number
  beforeId: number
  pointCaptured: string
  monsterType: string
  monsterSubType: string
  teamId: number
  position: MatchPositionDto
  killerId: number
  timestamp: number
  assistingParticipantIds: number[]
  buildingType: string
  victimId: number
}

export type CurrentGameInfo = {
  /** The ID of the game */
  gameId: number
  /** The game type */
  gameType: string
  /** The game start time represented in epoch milliseconds */
  gameStartTime: number
  /** The ID of the map */
  mapId: number
  /** The amount of time in seconds that has passed since the game started */
  gameLength: number
  /** The ID of the platform on which the game is being played */
  platformId: string
  /** The game mode */
  gameMode: string
  /** Banned champion information */
  bannedChampions: BannedChampion[]
  /** The queue type (queue types are documented on the Game Constants page) */
  gameQueueConfigId: number
  /** The observer information */
  observers: Observer
  /** The participant information */
  participants: CurrentGameParticipant[]
}

export type BannedChampion = {
  /** The turn during which the champion was banned */
  pickTurn: number
  /** The ID of the banned champion */
  championId: number
  /** The ID of the team that banned the champion */
  teamId: number
}

export type Observer = {
  /** Key used to decrypt the spectator grid game data for playback */
  encryptionKey: string
}

export type CurrentGameParticipant = {
  /** The ID of the champion played by this participant */
  championId: number
  /** Perks/Runes Reforged Information */
  perks: Perks
  /** The ID of the profile icon used by this participant */
  profileIconId: number
  /** Flag indicating whether or not this participant is a bot */
  bot: boolean
  /** The team ID of this participant, indicating the participant's team */
  teamId: number
  /** The summoner name of this participant */
  summonerName: string
  /** The encrypted summoner ID of this participant */
  summonerId: string
  /** The ID of the first summoner spell used by this participant */
  spell1Id: number
  /** The ID of the second summoner spell used by this participant */
  spell2Id: number
  /** List of Game Customizations */
  gameCustomizationObjects: GameCustomizationObject[]
}

export type Perks = {
  /** IDs of the perks/runes assigned. */
  perkIds: number[]
  /** Primary runes path */
  perkStyle: number
  /** Secondary runes path */
  perkSubStyle: number
}

export type GameCustomizationObject = {
  /** Category identifier for Game Customization */
  category: string
  /** Game Customization content */
  content: string
}

export type FeaturedGames = {
  /** The list of featured games */
  gameList: FeaturedGameInfo[]
  /** The suggested interval to wait before requesting FeaturedGames again */
  clientRefreshInterval: number
}

export type FeaturedGameInfo = {
  /** The game mode
 (Legal values: CLASSIC, ODIN, ARAM, TUTORIAL, ONEFORALL, ASCENSION, FIRSTBLOOD, KINGPORO) */
  gameMode: string
  /** The amount of time in seconds that has passed since the game started */
  gameLength: number
  /** The ID of the map */
  mapId: number
  /** The game type
 (Legal values: CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME) */
  gameType: string
  /** Banned champion information */
  bannedChampions: BannedChampion[]
  /** The ID of the game */
  gameId: number
  /** The observer information */
  observers: Observer
  /** The queue type (queue types are documented on the Game Constants page) */
  gameQueueConfigId: number
  /** The game start time represented in epoch milliseconds */
  gameStartTime: number
  /** The participant information */
  participants: Participant[]
  /** The ID of the platform on which the game is being played */
  platformId: string
}

export type Participant = {
  /** Flag indicating whether or not this participant is a bot */
  bot: boolean
  /** The ID of the second summoner spell used by this participant */
  spell2Id: number
  /** The ID of the profile icon used by this participant */
  profileIconId: number
  /** The summoner name of this participant */
  summonerName: string
  /** The ID of the champion played by this participant */
  championId: number
  /** The team ID of this participant, indicating the participant's team */
  teamId: number
  /** The ID of the first summoner spell used by this participant */
  spell1Id: number
}

/** represents a summoner */
export type SummonerDTO = {
  /** Encrypted account ID. Max length 56 characters. */
  accountId: string
  /** ID of the summoner icon associated with the summoner. */
  profileIconId: number
  /** Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change */
  revisionDate: number
  /** Summoner name. */
  name: string
  /** Encrypted summoner ID. Max length 63 characters. */
  id: string
  /** Encrypted PUUID. Exact length of 78 characters. */
  puuid: string
  /** Summoner level associated with the summoner. */
  summonerLevel: number
}
