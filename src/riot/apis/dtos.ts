export interface AccountDto {
  puuid: string
  /** This field may be excluded from the response if the account doesn't have a gameName. */
  gameName: string
  /** This field may be excluded from the response if the account doesn't have a tagLine. */
  tagLine: string
}
/** This object contains single Champion Mastery information for player and champion combination. */
export interface ChampionMasteryDto {
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

export interface ChampionInfo {
  maxNewPlayerLevel: number
  freeChampionIdsForNewPlayers: number[]
  freeChampionIds: number[]
}

export interface PlayerDto {
  summonerId: string
  /** (Legal values:  UNSELECTED,  FILL,  TOP,  JUNGLE,  MIDDLE,  BOTTOM,  UTILITY) */
  position: string
  /** (Legal values:  CAPTAIN,  MEMBER) */
  role: string
}

export interface TeamDto {
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

export interface TournamentDto {
  id: number
  themeId: number
  nameKey: string
  nameKeySecondary: string
  /** Tournament phase. */
  schedule: TournamentPhaseDto[]
}

export interface TournamentPhaseDto {
  id: number
  registrationTime: number
  startTime: number
  cancelled: boolean
}

export interface LeagueEntryDTO {
  leagueId: string
  /** Player's summonerId (Encrypted) */
  summonerId: string
  summonerName: string
  queueType: string
  tier: string
  /** The player's division within a tier. */
  rank: string
  leaguePoints: number
  /** Winning team on Summoners Rift. First placement in Teamfight Tactics. */
  wins: number
  /** Losing team on Summoners Rift. Second through eighth placement in Teamfight Tactics. */
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries: MiniSeriesDTO
}

export interface MiniSeriesDTO {
  losses: number
  progress: string
  target: number
  wins: number
}

export interface LeagueListDTO {
  leagueId: string
  entries: LeagueItemDTO[]
  tier: string
  name: string
  queue: string
}

export interface LeagueItemDTO {
  freshBlood: boolean
  /** Winning team on Summoners Rift. */
  wins: number
  summonerName: string
  miniSeries: MiniSeriesDTO
  inactive: boolean
  veteran: boolean
  hotStreak: boolean
  rank: string
  leaguePoints: number
  /** Losing team on Summoners Rift. */
  losses: number
  /** Player's encrypted summonerId. */
  summonerId: string
}

export interface MiniSeriesDTO {
  losses: number
  progress: string
  target: number
  wins: number
}

export interface LeagueEntryDTO {
  leagueId: string
  /** Player's encrypted summonerId. */
  summonerId: string
  summonerName: string
  queueType: string
  tier: string
  /** The player's division within a tier. */
  rank: string
  leaguePoints: number
  /** Winning team on Summoners Rift. */
  wins: number
  /** Losing team on Summoners Rift. */
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries: MiniSeriesDTO
}

export interface PlatformDataDto {
  id: string
  name: string
  locales: string[]
  maintenances: StatusDto[]
  incidents: StatusDto[]
}

export interface StatusDto {
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

export interface ContentDto {
  locale: string
  content: string
}

export interface UpdateDto {
  id: number
  author: string
  publish: boolean
  /** (Legal values: riotclient, riotstatus, game) */
  publish_locations: string[]
  translations: ContentDto[]
  created_at: string
  updated_at: string
}

export interface MatchDto {
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

interface ParticipantIdentityDto {
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

interface TeamStatsDto {
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

interface TeamBansDto {
  /** Banned championId. */
  championId: number
  /** Turn during which the champion was banned. */
  pickTurn: number
}

interface ParticipantDto {
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

interface RuneDto {
  runeId: number
  rank: number
}

interface ParticipantStatsDto {
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

interface ParticipantTimelineDto {
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

interface MasteryDto {
  rank: number
  masteryId: number
}

export interface MatchTimelineDto {
  frames: MatchFrameDto[]
  frameInterval: number
}

interface MatchFrameDto {
  participantFrames: Record<string, MatchParticipantFrameDto>
  events: MatchEventDto[]
  timestamp: number
}

interface MatchParticipantFrameDto {
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

interface MatchPositionDto {
  x: number
  y: number
}

interface MatchEventDto {
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

export interface CurrentGameInfo {
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

export interface BannedChampion {
  /** The turn during which the champion was banned */
  pickTurn: number
  /** The ID of the banned champion */
  championId: number
  /** The ID of the team that banned the champion */
  teamId: number
}

export interface Observer {
  /** Key used to decrypt the spectator grid game data for playback */
  encryptionKey: string
}

export interface CurrentGameParticipant {
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

export interface Perks {
  /** IDs of the perks/runes assigned. */
  perkIds: number[]
  /** Primary runes path */
  perkStyle: number
  /** Secondary runes path */
  perkSubStyle: number
}

export interface GameCustomizationObject {
  /** Category identifier for Game Customization */
  category: string
  /** Game Customization content */
  content: string
}

export interface FeaturedGames {
  /** The list of featured games */
  gameList: FeaturedGameInfo[]
  /** The suggested interval to wait before requesting FeaturedGames again */
  clientRefreshInterval: number
}

export interface FeaturedGameInfo {
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

export interface Participant {
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
export interface SummonerDTO {
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

export interface TournamentCodeParameters {
  /** Optional list of encrypted summonerIds in order to validate the players eligible to join the lobby. NOTE: We currently do not enforce participants at the team level, but rather the aggregate of teamOne and teamTwo. We may add the ability to enforce at the team level in the future. */
  allowedSummonerIds: string[]
  /** Optional string that may contain any data in any format, if specified at all. Used to denote any custom information about the game. */
  metadata: string
  /** The team size of the game. Valid values are 1-5. */
  teamSize: number
  /** The pick type of the game.
 (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT) */
  pickType: string
  /** The map type of the game.
 (Legal values: SUMMONERS_RIFT, TWISTED_TREELINE, HOWLING_ABYSS) */
  mapType: string
  /** The spectator type of the game.
 (Legal values: NONE, LOBBYONLY, ALL) */
  spectatorType: string
}

export interface LobbyEventDTOWrapper {
  eventList: LobbyEventDTO[]
}

export interface LobbyEventDTO {
  /** The summonerId that triggered the event (Encrypted) */
  summonerId: string
  /** The type of event that was triggered */
  eventType: string
  /** Timestamp from the event */
  timestamp: string
}

export interface ProviderRegistrationParameters {
  /** The region in which the provider will be running tournaments.
 (Legal values: BR, EUNE, EUW, JP, LAN, LAS, NA, OCE, PBE, RU, TR) */
  region: string
  /** The provider's callback URL to which tournament game results in this region should be posted. The URL must be well-formed, use the http or https protocol, and use the default port for the protocol (http URLs must use port 80, https URLs must use port 443). */
  url: string
}

export interface TournamentRegistrationParameters {
  /** The provider ID to specify the regional registered provider data to associate this tournament. */
  providerId: number
  /** The optional name of the tournament. */
  name: string
}

export interface TournamentCodeDTO {
  /** The tournament code. */
  code: string
  /** The spectator mode for the tournament code game. */
  spectators: string
  /** The lobby name for the tournament code game. */
  lobbyName: string
  /** The metadata for tournament code. */
  metaData: string
  /** The password for the tournament code game. */
  password: string
  /** The team size for the tournament code game. */
  teamSize: number
  /** The provider's ID. */
  providerId: number
  /** The pick mode for tournament code game. */
  pickType: string
  /** The tournament's ID. */
  tournamentId: number
  /** The tournament code's ID. */
  id: number
  /** The tournament code's region.
 (Legal values: BR, EUNE, EUW, JP, LAN, LAS, NA, OCE, PBE, RU, TR) */
  region: string
  /** The game map for the tournament code game */
  map: string
  /** The summonerIds of the participants (Encrypted) */
  participants: string[]
}

export interface TournamentCodeUpdateParameters {
  /** Optional list of encrypted summonerIds in order to validate the players eligible to join the lobby. NOTE: We currently do not enforce participants at the team level, but rather the aggregate of teamOne and teamTwo. We may add the ability to enforce at the team level in the future. */
  allowedSummonerIds: string[]
  /** The pick type
 (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT) */
  pickType: string
  /** The map type
 (Legal values: SUMMONERS_RIFT, TWISTED_TREELINE, HOWLING_ABYSS) */
  mapType: string
  /** The spectator type
 (Legal values: NONE, LOBBYONLY, ALL) */
  spectatorType: string
}