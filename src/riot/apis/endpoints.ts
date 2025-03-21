import type {
  AccountDto,
  ActiveShardDto,
  ApexPlayerInfoDto,
  ChallengeConfigInfoDto,
  ChampionInfo,
  ChampionMasteryDto,
  CurrentGameInfo,
  FeaturedGames,
  LeagueEntryDTO,
  LeagueListDTO,
  Level,
  MatchDto,
  PlatformDataDto,
  PlayerDto,
  PlayerInfoDto,
  SummonerDTO,
  TeamDto,
  TournamentDto,
  TimelineDto,
} from './dtos'
import type {
  GetChallengeLeaderboardsInput,
  GetTopChampionMasteriesInput,
  LeagueEntryInput,
  MatchIdsInput,
  RsoMatchIdsInput,
  RsoMatchInput,
} from './inputs'
import { GeneralRegion, RiotRateLimiter } from './rate-limiter'

export function createEndpoints(limiter: RiotRateLimiter) {
  return {
    // #region ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get account by puuid */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get account by riot id */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/accounts/me': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get account by access token */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get active shard for a player */
      get() {
        return limiter.execute<ActiveShardDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get all champion mastery entries sorted by number of champion points descending. */
      get() {
        return limiter.execute<ChampionMasteryDto[]>(
          generalRegion,
          realPath,
          path,
        )
      },
    }),
    '/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}/by-champion/{championId}':
      (generalRegion: GeneralRegion, realPath: string, path: string) => ({
        /* Get a champion mastery by puuid and champion ID. */
        get() {
          return limiter.execute<ChampionMasteryDto>(
            generalRegion,
            realPath,
            path,
          )
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-puuid/{encryptedPUUID}/top':
      (generalRegion: GeneralRegion, realPath: string, path: string) => ({
        /* Get specified number of top champion mastery entries sorted by number of champion points descending. */
        get({ query }: GetTopChampionMasteriesInput) {
          return limiter.execute<ChampionMasteryDto[]>(
            generalRegion,
            realPath,
            path,
            query,
          )
        },
      }),
    '/lol/champion-mastery/v4/scores/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
      get() {
        return limiter.execute<number>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region CHAMPION-V3
    '/lol/platform/v3/champion-rotations': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return limiter.execute<ChampionInfo>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region CLASH-V1
    '/lol/clash/v1/players/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get players by puuid */
      get() {
        return limiter.execute<PlayerDto[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get team by ID. */
      get() {
        return limiter.execute<TeamDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get all active or upcoming tournaments. */
      get() {
        return limiter.execute<TournamentDto[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get tournament by team ID. */
      get() {
        return limiter.execute<TournamentDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get tournament by ID. */
      get() {
        return limiter.execute<TournamentDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region LEAGUE-EXP-V4
    '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(
          generalRegion,
          realPath,
          path,
          query,
        )
      },
    }),
    // #endregion

    // #region LEAGUE-V4
    '/lol/league/v4/challengerleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get the challenger league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/entries/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get league entries in all queues for a given puuid */
      get() {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get league entries in all queues for a given summoner ID. */
      get() {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(
          generalRegion,
          realPath,
          path,
          query,
        )
      },
    }),
    '/lol/league/v4/grandmasterleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get the grandmaster league of a specific queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get league with given ID, including inactive entries. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get the master league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region LOL-CHALLENGES-V1
    '/lol/challenges/v1/challenges/config': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* List of all basic challenge configuration information (includes all translations for names and descriptions) */
      get() {
        return limiter.execute<ChallengeConfigInfoDto[]>(
          generalRegion,
          realPath,
          path,
        )
      },
    }),
    '/lol/challenges/v1/challenges/percentiles': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Map of level to percentile of players who have achieved it - keys: ChallengeId -> Season -> Level -> percentile of players who achieved it */
      get() {
        return limiter.execute<
          Record<number, Record<number, Record<Level, number>>>
        >(generalRegion, realPath, path)
      },
    }),
    '/lol/challenges/v1/challenges/{challengeId}/config': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get challenge configuration (REST) */
      get() {
        return limiter.execute<ChallengeConfigInfoDto>(
          generalRegion,
          realPath,
          path,
        )
      },
    }),
    '/lol/challenges/v1/challenges/{challengeId}/leaderboards/by-level/{level}':
      (generalRegion: GeneralRegion, realPath: string, path: string) => ({
        /* Return top players for each level. Level must be MASTER, GRANDMASTER or CHALLENGER. */
        get({ query }: GetChallengeLeaderboardsInput) {
          return limiter.execute<ApexPlayerInfoDto[]>(
            generalRegion,
            realPath,
            path,
            query,
          )
        },
      }),
    '/lol/challenges/v1/challenges/{challengeId}/percentiles': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Map of level to percentile of players who have achieved it */
      get() {
        return limiter.execute<Record<Level, number>>(
          generalRegion,
          realPath,
          path,
        )
      },
    }),
    '/lol/challenges/v1/player-data/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Returns player information with list of all progressed challenges (REST) */
      get() {
        return limiter.execute<PlayerInfoDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region LOL-RSO-MATCH-V1
    '/lol/rso-match/v1/matches/ids': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a list of match ids by player access token - Includes custom matches */
      get({ query }: RsoMatchIdsInput) {
        return limiter.execute<string[]>(generalRegion, realPath, path, query)
      },
    }),
    '/lol/rso-match/v1/matches/{matchId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a match by match id */
      get({ query }: RsoMatchInput) {
        return limiter.execute<MatchDto>(generalRegion, realPath, path, query)
      },
    }),
    '/lol/rso-match/v1/matches/{matchId}/timeline': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a match timeline by match id */
      get({ query }: RsoMatchInput) {
        return limiter.execute<TimelineDto>(
          generalRegion,
          realPath,
          path,
          query,
        )
      },
    }),
    // #endregion

    // #region LOL-STATUS-V4
    '/lol/status/v4/platform-data': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get League of Legends status for the given platform. */
      get() {
        return limiter.execute<PlatformDataDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region MATCH-V5
    '/lol/match/v5/matches/by-puuid/{puuid}/ids': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return limiter.execute<string[]>(generalRegion, realPath, path, query)
      },
    }),
    '/lol/match/v5/matches/{matchId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a match by match id */
      get() {
        return limiter.execute<MatchDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a match timeline by match id */
      get() {
        return limiter.execute<TimelineDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region SPECTATOR-V5
    '/lol/spectator/v5/active-games/by-summoner/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get current game information for the given puuid. */
      get() {
        return limiter.execute<CurrentGameInfo>(generalRegion, realPath, path)
      },
    }),
    '/lol/spectator/v5/featured-games': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get list of featured games. */
      get() {
        return limiter.execute<FeaturedGames>(generalRegion, realPath, path)
      },
    }),
    // #endregion

    // #region SUMMONER-V4
    '/fulfillment/v1/summoners/by-puuid/{rsoPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a summoner by its RSO encrypted PUUID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a summoner by account ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a summoner by PUUID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/me': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a summoner by access token. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /* Get a summoner by summoner ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    // #endregion
  }
}
