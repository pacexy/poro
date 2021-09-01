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
import { RateLimiter } from './rate-limiter'

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
  private readonly endpoints
  private readonly platform
  private readonly region

  constructor({ auth, platform, region }: ClientConfig) {
    this.limiter = new RateLimiter(auth)
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

    const url = `https://${originPrefix?.toLowerCase()}.api.riotgames.com${realPath}`

    return this.endpoints[path](encodeURI(url)) as ReturnType<Endpoints[Path]>
  }
}

function createEndpoints(limiter: RateLimiter) {
  return {
    // ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (url: string) => ({
      /** Get account by puuid */
      get() {
        return limiter.execute<AccountDto>(url)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      url: string,
    ) => ({
      /** Get account by riot id */
      get() {
        return limiter.execute<AccountDto>(url)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      url: string,
    ) => ({
      /** Get active shard for a player */
      get() {
        return limiter.execute<any>(url)
      },
    }),
    '/riot/account/v1/accounts/me': (url: string) => ({
      /** Get account by access token */
      get() {
        return limiter.execute<AccountDto>(url)
      },
    }),

    // CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}':
      (url: string) => ({
        /** Get all champion mastery entries sorted by number of champion points descending, */
        get() {
          return limiter.execute<ChampionMasteryDto[]>(url)
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}':
      (url: string) => ({
        /** Get a champion mastery by player ID and champion ID. */
        get() {
          return limiter.execute<ChampionMasteryDto>(url)
        },
      }),
    '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
      get() {
        return limiter.execute<number>(url)
      },
    }),

    // CHAMPION-V3
    '/lol/platform/v3/champion-rotations': (url: string) => ({
      /** Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return limiter.execute<ChampionInfo>(url)
      },
    }),

    // CLASH-V1
    '/lol/clash/v1/players/by-summoner/{summonerId}': (url: string) => ({
      /** Get players by summoner ID. */
      get() {
        return limiter.execute<PlayerDto[]>(url)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (url: string) => ({
      /** Get team by ID. */
      get() {
        return limiter.execute<TeamDto>(url)
      },
    }),
    '/lol/clash/v1/tournaments': (url: string) => ({
      /** Get all active or upcoming tournaments. */
      get() {
        return limiter.execute<TournamentDto[]>(url)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (url: string) => ({
      /** Get tournament by team ID. */
      get() {
        return limiter.execute<TournamentDto>(url)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (url: string) => ({
      /** Get tournament by ID. */
      get() {
        return limiter.execute<TournamentDto>(url)
      },
    }),

    // LEAGUE-EXP-V4
    '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': (url: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(url, query)
      },
    }),

    // LEAGUE-V4
    '/lol/league/v4/challengerleagues/by-queue/{queue}': (url: string) => ({
      /** Get the challenger league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get league entries in all queues for a given summoner ID. */
      get() {
        return limiter.execute<LeagueEntryDTO[]>(url)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (url: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return limiter.execute<LeagueEntryDTO[]>(url, query)
      },
    }),
    '/lol/league/v4/grandmasterleagues/by-queue/{queue}': (url: string) => ({
      /** Get the grandmaster league of a specific queue. */
      get() {
        return limiter.execute<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (url: string) => ({
      /** Get league with given ID, including inactive entries. */
      get() {
        return limiter.execute<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (url: string) => ({
      /** Get the master league for given queue. */
      get() {
        return limiter.execute<LeagueListDTO>(url)
      },
    }),

    // LOL-STATUS-V4
    '/lol/status/v4/platform-data': (url: string) => ({
      /** Get League of Legends status for the given platform. */
      get() {
        return limiter.execute<PlatformDataDto>(url)
      },
    }),

    // MATCH-V5
    '/lol/match/v5/matches/by-puuid/{puuid}/ids': (url: string) => ({
      /** Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return limiter.execute<string[]>(url, query)
      },
    }),
    '/lol/match/v5/matches/{matchId}': (url: string) => ({
      /** Get a match by match id */
      get() {
        return limiter.execute<MatchDto>(url)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (url: string) => ({
      /** Get a match timeline by match id */
      get() {
        return limiter.execute<MatchTimelineDto>(url)
      },
    }),

    // SPECTATOR-V4
    '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get current game information for the given summoner ID. */
      get() {
        return limiter.execute<CurrentGameInfo>(url)
      },
    }),
    '/lol/spectator/v4/featured-games': (url: string) => ({
      /** Get list of featured games. */
      get() {
        return limiter.execute<FeaturedGames>(url)
      },
    }),

    // SUMMONER-V4
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      url: string,
    ) => ({
      /** Get a summoner by account ID. */
      get() {
        return limiter.execute<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/by-name/{summonerName}': (url: string) => ({
      /** Get a summoner by summoner name. */
      get() {
        return limiter.execute<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (url: string) => ({
      /** Get a summoner by PUUID. */
      get() {
        return limiter.execute<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (url: string) => ({
      /** Get a summoner by summoner ID. */
      get() {
        return limiter.execute<SummonerDTO>(url)
      },
    }),

    // THIRD-PARTY-CODE-V4
    '/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get third party code for a given summoner ID. */
      get() {
        return limiter.execute<string>(url)
      },
    }),
  }
}
