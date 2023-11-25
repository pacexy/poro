import {
  AccountDto,
  ChampionInfo,
  ChampionMasteryDto,
  CurrentGameInfo,
  FeaturedGames,
  LeagueEntryDTO,
  LeagueListDTO,
  MatchDto,
  PlatformDataDto,
  PlayerDto,
  SummonerDTO,
  TeamDto,
  TournamentDto,
} from './dtos'
import { LeagueEntryInput, MatchIdsInput } from './inputs'
import { GeneralRegion, RiotRateLimiter } from './rate-limiter'

export function createEndpoints(limiter: RiotRateLimiter) {
  return {
    // #region ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get account by puuid */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get account by riot id */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get active shard for a player */
      get() {
        return limiter.execute<any>(generalRegion, realPath, path)
      },
    }),
    '/riot/account/v1/accounts/me': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get account by access token */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}':
      (generalRegion: GeneralRegion, realPath: string, path: string) => ({
        /** Get all champion mastery entries sorted by number of champion points descending, */
        get() {
          return limiter.execute<ChampionMasteryDto[]>(
            generalRegion,
            realPath,
            path,
          )
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}':
      (generalRegion: GeneralRegion, realPath: string, path: string) => ({
        /** Get a champion mastery by player ID and champion ID. */
        get() {
          return limiter.execute<ChampionMasteryDto>(
            generalRegion,
            realPath,
            path,
          )
        },
      }),
    '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
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
      /** Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return limiter.execute<ChampionInfo>(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region CLASH-V1
    '/lol/clash/v1/players/by-summoner/{summonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get players by summoner ID. */
      get() {
        return limiter.execute<PlayerDto[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get team by ID. */
      get() {
        return limiter.execute<TeamDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get all active or upcoming tournaments. */
      get() {
        return limiter.execute<TournamentDto[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get tournament by team ID. */
      get() {
        return limiter.execute<TournamentDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get tournament by ID. */
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
      /** Get all the league entries. */
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
      /** Get the challenger league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get league entries in all queues for a given summoner ID. */
      get() {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get all the league entries. */
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
      /** Get the grandmaster league of a specific queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get league with given ID, including inactive entries. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get the master league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region LOL-STATUS-V4
    '/lol/status/v4/platform-data': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get League of Legends status for the given platform. */
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
      /** Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return limiter.execute<string[]>(generalRegion, realPath, path, query)
      },
    }),
    '/lol/match/v5/matches/{matchId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a match by match id */
      get() {
        return limiter.execute<MatchDto>(generalRegion, realPath, path)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a match timeline by match id */
      get() {
        // TODO: add `MatchTimelineDto` when it is finalized
        return limiter.execute(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region SPECTATOR-V4
    '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get current game information for the given summoner ID. */
      get() {
        return limiter.execute<CurrentGameInfo>(generalRegion, realPath, path)
      },
    }),
    '/lol/spectator/v4/featured-games': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get list of featured games. */
      get() {
        return limiter.execute<FeaturedGames>(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region SUMMONER-V4
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a summoner by account ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-name/{summonerName}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a summoner by summoner name. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a summoner by PUUID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get a summoner by summoner ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, realPath, path)
      },
    }),
    // #endregion
    // #region THIRD-PARTY-CODE-V4
    '/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      realPath: string,
      path: string,
    ) => ({
      /** Get third party code for a given summoner ID. */
      get() {
        return limiter.execute<string>(generalRegion, realPath, path)
      },
    }),
    // #endregion
  }
}