import axios from 'axios'
import axiosRetry from 'axios-retry'

import {
  AccountDto,
  ChampionInfo,
  ChampionMasteryDto,
  CurrentGameInfo,
  FeaturedGames,
  LeagueEntryDTO,
  LeagueListDTO,
  MatchDto,
  MatchTimelineDto,
  PlatformDataDto,
  PlayerDto,
  SummonerDTO,
  TeamDto,
  TournamentDto,
} from './dtos'
import { Platform, Region } from './enums'
import { LeagueEntryInput, MatchIdsInput } from './inputs'
import { GeneralRegion, LimiterConfig, RiotRateLimiter } from './rate-limiter'

type Endpoints = ReturnType<typeof createEndpoints>

type PathParametersUnion<P> =
  P extends `${string}{${infer Parameter}}${infer Tail}`
    ? Parameter | PathParametersUnion<Tail>
    : never

const regionScopedPathPrefix = ['/riot', '/lol/match/v5'] as const
type RegionScopedPathPrefix = typeof regionScopedPathPrefix[number]
type OriginPrefix<P> = P extends `${RegionScopedPathPrefix}${string}`
  ? [prefix?: Region]
  : [platform?: Platform]

type UrlParameters<P> = PathParametersUnion<P> extends never
  ? [...OriginPrefix<P>]
  : [
      {
        [key in PathParametersUnion<P>]: string | number
      },
      ...OriginPrefix<P>
    ]

interface ClientConfig extends LimiterConfig {
  auth: string
  platform?: Platform
  region?: Region
}

export class Client {
  readonly axiosInstance = axios.create()
  private readonly limiter
  private readonly endpoints
  private readonly platform
  private readonly region

  constructor({ auth, platform, region, ...limiterConfig }: ClientConfig) {
    this.axiosInstance.defaults.headers.common['X-Riot-Token'] = auth
    this.limiter = new RiotRateLimiter(this.axiosInstance, limiterConfig)
    this.endpoints = createEndpoints(this.limiter)
    this.platform = platform
    this.region = region

    axiosRetry(this.axiosInstance, {
      retryCondition(err) {
        const errCodes = ['ECONNRESET', 'ETIMEDOUT']
        const statusCodes = [403, 503]
        const errCode = err.code ?? ''
        const statusCode = err.response?.status ?? 0

        if (errCodes.includes(errCode)) {
          return true
        }
        if (statusCodes.includes(statusCode)) {
          return true
        }

        return false
      },
    })
  }

  path<Path extends keyof Endpoints>(
    path: Path,
    ...urlParameters: UrlParameters<Path>
  ) {
    let realPath: string = path
    const pathParam = urlParameters[0]
    let originPrefix = urlParameters[1]

    if (typeof pathParam === 'object') {
      Object.keys(pathParam).forEach((paramName: PathParametersUnion<Path>) => {
        realPath = realPath.replace(
          `{${paramName}}`,
          String(pathParam[paramName]),
        )
      })
    } else {
      originPrefix = pathParam
    }

    const isRegionScoped = regionScopedPathPrefix.some((prefix) =>
      path.startsWith(prefix),
    )
    if (isRegionScoped) {
      originPrefix ??= this.region ?? Region.AMERICAS
    } else {
      originPrefix ??= this.platform ?? Platform.NA
    }

    return this.endpoints[path](
      originPrefix as GeneralRegion,
      encodeURI(realPath),
      path,
    ) as ReturnType<Endpoints[Path]>
  }
}

function createEndpoints(limiter: RiotRateLimiter) {
  return {
    // ACCOUNT-V1
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

    // CHAMPION-MASTERY-V4
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

    // CHAMPION-V3
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

    // CLASH-V1
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

    // LEAGUE-EXP-V4
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

    // LEAGUE-V4
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

    // LOL-STATUS-V4
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

    // MATCH-V5
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
        return limiter.execute<MatchTimelineDto>(generalRegion, realPath, path)
      },
    }),

    // SPECTATOR-V4
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

    // SUMMONER-V4
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

    // THIRD-PARTY-CODE-V4
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
  }
}
