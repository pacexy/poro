import axios from 'axios'

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
import { GeneralRegion, RiotRateLimiter } from './rate-limiter'

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

interface ClientConfig {
  auth: string
  platform?: Platform
  region?: Region
}

export class Client {
  readonly limiter
  readonly axiosInstance = axios.create()
  private readonly endpoints
  private readonly platform
  private readonly region

  constructor({ auth, platform, region }: ClientConfig) {
    this.axiosInstance.defaults.headers.common['X-Riot-Token'] = auth
    this.limiter = new RiotRateLimiter(this.axiosInstance)
    this.endpoints = createEndpoints(this.limiter)
    this.platform = platform
    this.region = region
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
    ) as ReturnType<Endpoints[Path]>
  }
}

function createEndpoints(limiter: RiotRateLimiter) {
  return {
    // ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get account by puuid */
      get() {
        return limiter.execute<AccountDto>(generalRegion, path)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get account by riot id */
      get() {
        return limiter.execute<AccountDto>(generalRegion, path)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get active shard for a player */
      get() {
        return limiter.execute<any>(generalRegion, path)
      },
    }),
    '/riot/account/v1/accounts/me': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get account by access token */
      get() {
        return limiter.execute<AccountDto>(generalRegion, path)
      },
    }),

    // CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}':
      (generalRegion: GeneralRegion, path: string) => ({
        /** Get all champion mastery entries sorted by number of champion points descending, */
        get() {
          return limiter.execute<ChampionMasteryDto[]>(generalRegion, path)
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}':
      (generalRegion: GeneralRegion, path: string) => ({
        /** Get a champion mastery by player ID and champion ID. */
        get() {
          return limiter.execute<ChampionMasteryDto>(generalRegion, path)
        },
      }),
    '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
      get() {
        return limiter.execute<number>(generalRegion, path)
      },
    }),

    // CHAMPION-V3
    '/lol/platform/v3/champion-rotations': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return limiter.execute<ChampionInfo>(generalRegion, path)
      },
    }),

    // CLASH-V1
    '/lol/clash/v1/players/by-summoner/{summonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get players by summoner ID. */
      get() {
        return limiter.execute<PlayerDto[]>(generalRegion, path)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get team by ID. */
      get() {
        return limiter.execute<TeamDto>(generalRegion, path)
      },
    }),
    '/lol/clash/v1/tournaments': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get all active or upcoming tournaments. */
      get() {
        return limiter.execute<TournamentDto[]>(generalRegion, path)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get tournament by team ID. */
      get() {
        return limiter.execute<TournamentDto>(generalRegion, path)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get tournament by ID. */
      get() {
        return limiter.execute<TournamentDto>(generalRegion, path)
      },
    }),

    // LEAGUE-EXP-V4
    '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, path, query)
      },
    }),

    // LEAGUE-V4
    '/lol/league/v4/challengerleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get the challenger league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, path)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get league entries in all queues for a given summoner ID. */
      get() {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, path)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(generalRegion, path, query)
      },
    }),
    '/lol/league/v4/grandmasterleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get the grandmaster league of a specific queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, path)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get league with given ID, including inactive entries. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, path)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get the master league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(generalRegion, path)
      },
    }),

    // LOL-STATUS-V4
    '/lol/status/v4/platform-data': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get League of Legends status for the given platform. */
      get() {
        return limiter.execute<PlatformDataDto>(generalRegion, path)
      },
    }),

    // MATCH-V5
    '/lol/match/v5/matches/by-puuid/{puuid}/ids': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return limiter.execute<string[]>(generalRegion, path, query)
      },
    }),
    '/lol/match/v5/matches/{matchId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a match by match id */
      get() {
        return limiter.execute<MatchDto>(generalRegion, path)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a match timeline by match id */
      get() {
        return limiter.execute<MatchTimelineDto>(generalRegion, path)
      },
    }),

    // SPECTATOR-V4
    '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get current game information for the given summoner ID. */
      get() {
        return limiter.execute<CurrentGameInfo>(generalRegion, path)
      },
    }),
    '/lol/spectator/v4/featured-games': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get list of featured games. */
      get() {
        return limiter.execute<FeaturedGames>(generalRegion, path)
      },
    }),

    // SUMMONER-V4
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a summoner by account ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-name/{summonerName}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a summoner by summoner name. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, path)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a summoner by PUUID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, path)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get a summoner by summoner ID. */
      get() {
        return limiter.execute<SummonerDTO>(generalRegion, path)
      },
    }),

    // THIRD-PARTY-CODE-V4
    '/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}': (
      generalRegion: GeneralRegion,
      path: string,
    ) => ({
      /** Get third party code for a given summoner ID. */
      get() {
        return limiter.execute<string>(generalRegion, path)
      },
    }),
  }
}
