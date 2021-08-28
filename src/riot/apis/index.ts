import axios, { AxiosInstance } from 'axios'

import {
  AccountDto,
  ChampionInfo,
  ChampionMasteryDto,
  CurrentGameInfo,
  FeaturedGames,
  LeagueEntryDTO,
  LeagueListDTO,
  LobbyEventDTOWrapper,
  MatchDto,
  MatchTimelineDto,
  PlatformDataDto,
  PlayerDto,
  SummonerDTO,
  TeamDto,
  TournamentCodeDTO,
  TournamentDto,
} from './dtos'
import {
  LeagueEntryInput,
  MatchIdsInput,
  ProviderRegistrationInput,
  SummonerInput,
  TournamentCodeInput,
  TournamentCodeUpdateInput,
  TournamentRegistrationInput,
} from './inputs'
import { Platform, Region } from './types'

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
  readonly axiosInstance = axios.create()
  private readonly endpoints
  private readonly platform
  private readonly region

  constructor({ auth, platform, region }: ClientConfig) {
    this.axiosInstance.defaults.headers.common['X-Riot-Token'] = auth
    this.endpoints = createEndpoints(this.axiosInstance)
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

    return this.endpoints[path](url) as ReturnType<Endpoints[Path]>
  }
}

function createEndpoints(axiosInstance: AxiosInstance) {
  return {
    // ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (url: string) => ({
      /** Get account by puuid */
      get() {
        return axiosInstance.get<AccountDto>(url)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      url: string,
    ) => ({
      /** Get account by riot id */
      get() {
        return axiosInstance.get<AccountDto>(url)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      url: string,
    ) => ({
      /** Get active shard for a player */
      get() {
        return axiosInstance.get<any>(url)
      },
    }),
    '/riot/account/v1/accounts/me': (url: string) => ({
      /** Get account by access token */
      get() {
        return axiosInstance.get<AccountDto>(url)
      },
    }),

    // CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}':
      (url: string) => ({
        /** Get all champion mastery entries sorted by number of champion points descending, */
        get() {
          return axiosInstance.get<ChampionMasteryDto[]>(url)
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}':
      (url: string) => ({
        /** Get a champion mastery by player ID and champion ID. */
        get() {
          return axiosInstance.get<ChampionMasteryDto>(url)
        },
      }),
    '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
      get() {
        return axiosInstance.get<number>(url)
      },
    }),

    // CHAMPION-V3
    '/lol/platform/v3/champion-rotations': (url: string) => ({
      /** Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return axiosInstance.get<ChampionInfo>(url)
      },
    }),

    // CLASH-V1
    '/lol/clash/v1/players/by-summoner/{summonerId}': (url: string) => ({
      /** Get players by summoner ID. */
      get() {
        return axiosInstance.get<PlayerDto[]>(url)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (url: string) => ({
      /** Get team by ID. */
      get() {
        return axiosInstance.get<TeamDto>(url)
      },
    }),
    '/lol/clash/v1/tournaments': (url: string) => ({
      /** Get all active or upcoming tournaments. */
      get() {
        return axiosInstance.get<TournamentDto[]>(url)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (url: string) => ({
      /** Get tournament by team ID. */
      get() {
        return axiosInstance.get<TournamentDto>(url)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (url: string) => ({
      /** Get tournament by ID. */
      get() {
        return axiosInstance.get<TournamentDto>(url)
      },
    }),

    // LEAGUE-EXP-V4
    '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': (url: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return axiosInstance.get<LeagueEntryDTO[]>(url, {
          params: query,
        })
      },
    }),

    // LEAGUE-V4
    '/lol/league/v4/challengerleagues/by-queue/{queue}': (url: string) => ({
      /** Get the challenger league for given queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get league entries in all queues for a given summoner ID. */
      get() {
        return axiosInstance.get<LeagueEntryDTO[]>(url)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (url: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return axiosInstance.get<LeagueEntryDTO[]>(url, {
          params: query,
        })
      },
    }),
    '/lol/league/v4/grandmasterleagues/by-queue/{queue}': (url: string) => ({
      /** Get the grandmaster league of a specific queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (url: string) => ({
      /** Get league with given ID, including inactive entries. */
      get() {
        return axiosInstance.get<LeagueListDTO>(url)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (url: string) => ({
      /** Get the master league for given queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(url)
      },
    }),

    // LOL-STATUS-V4
    '/lol/status/v4/platform-data': (url: string) => ({
      /** Get League of Legends status for the given platform. */
      get() {
        return axiosInstance.get<PlatformDataDto>(url)
      },
    }),

    // MATCH-V5
    '/lol/match/v5/matches/by-puuid/{puuid}/ids': (url: string) => ({
      /** Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return axiosInstance.get<string[]>(url, {
          params: query,
        })
      },
    }),
    '/lol/match/v5/matches/{matchId}': (url: string) => ({
      /** Get a match by match id */
      get() {
        return axiosInstance.get<MatchDto>(url)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (url: string) => ({
      /** Get a match timeline by match id */
      get() {
        return axiosInstance.get<MatchTimelineDto>(url)
      },
    }),

    // SPECTATOR-V4
    '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get current game information for the given summoner ID. */
      get() {
        return axiosInstance.get<CurrentGameInfo>(url)
      },
    }),
    '/lol/spectator/v4/featured-games': (url: string) => ({
      /** Get list of featured games. */
      get() {
        return axiosInstance.get<FeaturedGames>(url)
      },
    }),

    // SUMMONER-V4
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      url: string,
    ) => ({
      /** Get a summoner by account ID. */
      get() {
        return axiosInstance.get<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/by-name/{summonerName}': (url: string) => ({
      /** Get a summoner by summoner name. */
      get() {
        return axiosInstance.get<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (url: string) => ({
      /** Get a summoner by PUUID. */
      get() {
        return axiosInstance.get<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (url: string) => ({
      /** Get a summoner by summoner ID. */
      get() {
        return axiosInstance.get<SummonerDTO>(url)
      },
    }),
    '/lol/summoner/v4/summoners/me': (url: string) => ({
      /** Get a summoner by access token. */
      get({ header }: SummonerInput) {
        return axiosInstance.get<SummonerDTO>(url, {
          headers: { Authorization: `Bearer ${header.Authorization}` },
        })
      },
    }),

    // THIRD-PARTY-CODE-V4
    '/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}': (
      url: string,
    ) => ({
      /** Get third party code for a given summoner ID. */
      get() {
        return axiosInstance.get<string>(url)
      },
    }),

    // TOURNAMENT-STUB-V4
    '/lol/tournament-stub/v4/codes': (url: string) => ({
      /** Create a mock tournament code for the given tournament. */
      post({ query, body }: TournamentCodeInput) {
        return axiosInstance.post<string[]>(url, body, {
          params: query,
        })
      },
    }),
    '/lol/tournament-stub/v4/lobby-events/by-code/{tournamentCode}': (
      url: string,
    ) => ({
      /** Gets a mock list of lobby events by tournament code. */
      get() {
        return axiosInstance.get<LobbyEventDTOWrapper>(url)
      },
    }),
    '/lol/tournament-stub/v4/providers': (url: string) => ({
      /** Creates a mock tournament provider and returns its ID. */
      post({ body }: ProviderRegistrationInput) {
        return axiosInstance.post<number>(url, body)
      },
    }),
    '/lol/tournament-stub/v4/tournaments': (url: string) => ({
      /** Creates a mock tournament and returns its ID. */
      post({ body }: TournamentRegistrationInput) {
        return axiosInstance.post<number>(url, body)
      },
    }),

    // TOURNAMENT-V4
    '/lol/tournament/v4/codes': (url: string) => ({
      /** Create a tournament code for the given tournament. */
      post({ query, body }: TournamentCodeInput) {
        return axiosInstance.post<string[]>(url, body, {
          params: query,
        })
      },
    }),
    '/lol/tournament/v4/codes/{tournamentCode}': (url: string) => ({
      /** Returns the tournament code DTO associated with a tournament code string. */
      get() {
        return axiosInstance.get<TournamentCodeDTO>(url)
      },
      /** Update the pick type, map, spectator type, or allowed summoners for a code. */
      put({ body }: TournamentCodeUpdateInput) {
        return axiosInstance.put(url, body)
      },
    }),
    '/lol/tournament/v4/lobby-events/by-code/{tournamentCode}': (
      url: string,
    ) => ({
      /** Gets a list of lobby events by tournament code. */
      get() {
        return axiosInstance.get<LobbyEventDTOWrapper>(url)
      },
    }),
    '/lol/tournament/v4/providers': (url: string) => ({
      /** Creates a tournament provider and returns its ID. */
      post({ body }: ProviderRegistrationInput) {
        return axiosInstance.post<number>(url, body)
      },
    }),
    '/lol/tournament/v4/tournaments': (url: string) => ({
      /** Creates a tournament and returns its ID. */
      post({ body }: TournamentRegistrationInput) {
        return axiosInstance.post<number>(url, body)
      },
    }),
  }
}
