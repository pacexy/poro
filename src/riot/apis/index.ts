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

type PathParametersUnion<Path extends string> =
  Path extends `${string}{${infer Parameter}}${infer Tail}`
    ? Parameter | PathParametersUnion<Tail>
    : never

type PathParameters<Path extends string> =
  PathParametersUnion<Path> extends never
    ? []
    : [
        {
          [key in PathParametersUnion<Path>]: string | number
        },
      ]

const BASE_URL = 'api.riotgames.com'

interface EndpointsConfig {
  axiosInstance: AxiosInstance
  platform: Platform
  region: Region
}

interface ClientConfig {
  auth: string
  platform: Platform
  region: Region
}

export class Client {
  axiosInstance = axios.create()
  #endpoints

  constructor({ auth, platform, region }: ClientConfig) {
    this.axiosInstance.defaults.headers.common['X-Riot-Token'] = auth
    this.#endpoints = createEndpoints({
      axiosInstance: this.axiosInstance,
      platform,
      region,
    })
  }

  path<Path extends keyof Endpoints>(
    path: Path,
    ...pathParameters: PathParameters<Path>
  ) {
    let realPath: string = path
    const pathParam = pathParameters[0]

    if (pathParam) {
      Object.keys(pathParam).forEach((paramName: PathParametersUnion<Path>) => {
        realPath = realPath.replace(
          `{${paramName}}`,
          String(pathParam[paramName]),
        )
      })
    }

    return this.#endpoints[path](realPath) as ReturnType<Endpoints[Path]>
  }
}

function createEndpoints({ axiosInstance, platform, region }: EndpointsConfig) {
  const PLATFORM_BASE_URL = `https://${platform.toLowerCase()}.${BASE_URL}`
  const REGION_BASE_URL = `https://${region.toLowerCase()}.${BASE_URL}`

  return {
    // ACCOUNT-V1
    '/riot/account/v1/accounts/by-puuid/{puuid}': (path: string) => ({
      /** Get account by puuid */
      get() {
        return axiosInstance.get<AccountDto>(REGION_BASE_URL + path)
      },
    }),
    '/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (
      path: string,
    ) => ({
      /** Get account by riot id */
      get() {
        return axiosInstance.get<AccountDto>(REGION_BASE_URL + path)
      },
    }),
    '/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (
      path: string,
    ) => ({
      /** Get active shard for a player */
      get() {
        return axiosInstance.get<any>(REGION_BASE_URL + path)
      },
    }),
    '/riot/account/v1/accounts/me': (path: string) => ({
      /** Get account by access token */
      get() {
        return axiosInstance.get<AccountDto>(REGION_BASE_URL + path)
      },
    }),

    // CHAMPION-MASTERY-V4
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}':
      (path: string) => ({
        /** Get all champion mastery entries sorted by number of champion points descending, */
        get() {
          return axiosInstance.get<ChampionMasteryDto[]>(
            PLATFORM_BASE_URL + path,
          )
        },
      }),
    '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}':
      (path: string) => ({
        /** Get a champion mastery by player ID and champion ID. */
        get() {
          return axiosInstance.get<ChampionMasteryDto>(PLATFORM_BASE_URL + path)
        },
      }),
    '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}': (
      path: string,
    ) => ({
      /** Get a player's total champion mastery score, which is the sum of individual champion mastery levels. */
      get() {
        return axiosInstance.get<number>(PLATFORM_BASE_URL + path)
      },
    }),

    // CHAMPION-V3
    '/lol/platform/v3/champion-rotations': (path: string) => ({
      /** Returns champion rotations, including free-to-play and low-level free-to-play rotations (REST) */
      get() {
        return axiosInstance.get<ChampionInfo>(PLATFORM_BASE_URL + path)
      },
    }),

    // CLASH-V1
    '/lol/clash/v1/players/by-summoner/{summonerId}': (path: string) => ({
      /** Get players by summoner ID. */
      get() {
        return axiosInstance.get<PlayerDto[]>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/clash/v1/teams/{teamId}': (path: string) => ({
      /** Get team by ID. */
      get() {
        return axiosInstance.get<TeamDto>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/clash/v1/tournaments': (path: string) => ({
      /** Get all active or upcoming tournaments. */
      get() {
        return axiosInstance.get<TournamentDto[]>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/clash/v1/tournaments/by-team/{teamId}': (path: string) => ({
      /** Get tournament by team ID. */
      get() {
        return axiosInstance.get<TournamentDto>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/clash/v1/tournaments/{tournamentId}': (path: string) => ({
      /** Get tournament by ID. */
      get() {
        return axiosInstance.get<TournamentDto>(PLATFORM_BASE_URL + path)
      },
    }),

    // LEAGUE-EXP-V4
    '/lol/league-exp/v4/entries/{queue}/{tier}/{division}': (path: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return axiosInstance.get<LeagueEntryDTO[]>(PLATFORM_BASE_URL + path, {
          params: query,
        })
      },
    }),

    // LEAGUE-V4
    '/lol/league/v4/challengerleagues/by-queue/{queue}': (path: string) => ({
      /** Get the challenger league for given queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/league/v4/entries/by-summoner/{encryptedSummonerId}': (
      path: string,
    ) => ({
      /** Get league entries in all queues for a given summoner ID. */
      get() {
        return axiosInstance.get<LeagueEntryDTO[]>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/league/v4/entries/{queue}/{tier}/{division}': (path: string) => ({
      /** Get all the league entries. */
      get({ query }: LeagueEntryInput) {
        return axiosInstance.get<LeagueEntryDTO[]>(PLATFORM_BASE_URL + path, {
          params: query,
        })
      },
    }),
    '/lol/league/v4/grandmasterleagues/by-queue/{queue}': (path: string) => ({
      /** Get the grandmaster league of a specific queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/league/v4/leagues/{leagueId}': (path: string) => ({
      /** Get league with given ID, including inactive entries. */
      get() {
        return axiosInstance.get<LeagueListDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/league/v4/masterleagues/by-queue/{queue}': (path: string) => ({
      /** Get the master league for given queue. */
      get() {
        return axiosInstance.get<LeagueListDTO>(PLATFORM_BASE_URL + path)
      },
    }),

    // LOL-STATUS-V4
    '/lol/status/v4/platform-data': (path: string) => ({
      /** Get League of Legends status for the given platform. */
      get() {
        return axiosInstance.get<PlatformDataDto>(PLATFORM_BASE_URL + path)
      },
    }),

    // MATCH-V5
    '/lol/match/v5/matches/by-puuid/{puuid}/ids': (path: string) => ({
      /** Get a list of match ids by puuid */
      get({ query }: MatchIdsInput) {
        return axiosInstance.get<string[]>(PLATFORM_BASE_URL + path, {
          params: query,
        })
      },
    }),
    '/lol/match/v5/matches/{matchId}': (path: string) => ({
      /** Get a match by match id */
      get() {
        return axiosInstance.get<MatchDto>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/match/v5/matches/{matchId}/timeline': (path: string) => ({
      /** Get a match timeline by match id */
      get() {
        return axiosInstance.get<MatchTimelineDto>(PLATFORM_BASE_URL + path)
      },
    }),

    // SPECTATOR-V4
    '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}': (
      path: string,
    ) => ({
      /** Get current game information for the given summoner ID. */
      get() {
        return axiosInstance.get<CurrentGameInfo>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/spectator/v4/featured-games': (path: string) => ({
      /** Get list of featured games. */
      get() {
        return axiosInstance.get<FeaturedGames>(PLATFORM_BASE_URL + path)
      },
    }),

    // SUMMONER-V4
    '/lol/summoner/v4/summoners/by-account/{encryptedAccountId}': (
      path: string,
    ) => ({
      /** Get a summoner by account ID. */
      get() {
        return axiosInstance.get<SummonerDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/summoner/v4/summoners/by-name/{summonerName}': (path: string) => ({
      /** Get a summoner by summoner name. */
      get() {
        return axiosInstance.get<SummonerDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}': (path: string) => ({
      /** Get a summoner by PUUID. */
      get() {
        return axiosInstance.get<SummonerDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/summoner/v4/summoners/{encryptedSummonerId}': (path: string) => ({
      /** Get a summoner by summoner ID. */
      get() {
        return axiosInstance.get<SummonerDTO>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/summoner/v4/summoners/me': (path: string) => ({
      /** Get a summoner by access token. */
      get({ header }: SummonerInput) {
        return axiosInstance.get<SummonerDTO>(PLATFORM_BASE_URL + path, {
          headers: { Authorization: `Bearer ${header.Authorization}` },
        })
      },
    }),

    // THIRD-PARTY-CODE-V4
    '/lol/platform/v4/third-party-code/by-summoner/{encryptedSummonerId}': (
      path: string,
    ) => ({
      /** Get third party code for a given summoner ID. */
      get() {
        return axiosInstance.get<string>(PLATFORM_BASE_URL + path)
      },
    }),

    // TOURNAMENT-STUB-V4
    '/lol/tournament-stub/v4/codes': (path: string) => ({
      /** Create a mock tournament code for the given tournament. */
      post({ query, body }: TournamentCodeInput) {
        return axiosInstance.post<string[]>(PLATFORM_BASE_URL + path, body, {
          params: query,
        })
      },
    }),
    '/lol/tournament-stub/v4/lobby-events/by-code/{tournamentCode}': (
      path: string,
    ) => ({
      /** Gets a mock list of lobby events by tournament code. */
      get() {
        return axiosInstance.get<LobbyEventDTOWrapper>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/tournament-stub/v4/providers': (path: string) => ({
      /** Creates a mock tournament provider and returns its ID. */
      post({ body }: ProviderRegistrationInput) {
        return axiosInstance.post<number>(PLATFORM_BASE_URL + path, body)
      },
    }),
    '/lol/tournament-stub/v4/tournaments': (path: string) => ({
      /** Creates a mock tournament and returns its ID. */
      post({ body }: TournamentRegistrationInput) {
        return axiosInstance.post<number>(PLATFORM_BASE_URL + path, body)
      },
    }),

    // TOURNAMENT-V4
    '/lol/tournament/v4/codes': (path: string) => ({
      /** Create a tournament code for the given tournament. */
      post({ query, body }: TournamentCodeInput) {
        return axiosInstance.post<string[]>(PLATFORM_BASE_URL + path, body, {
          params: query,
        })
      },
    }),
    '/lol/tournament/v4/codes/{tournamentCode}': (path: string) => ({
      /** Returns the tournament code DTO associated with a tournament code string. */
      get() {
        return axiosInstance.get<TournamentCodeDTO>(PLATFORM_BASE_URL + path)
      },
      /** Update the pick type, map, spectator type, or allowed summoners for a code. */
      put({ body }: TournamentCodeUpdateInput) {
        return axiosInstance.put(PLATFORM_BASE_URL + path, body)
      },
    }),
    '/lol/tournament/v4/lobby-events/by-code/{tournamentCode}': (
      path: string,
    ) => ({
      /** Gets a list of lobby events by tournament code. */
      get() {
        return axiosInstance.get<LobbyEventDTOWrapper>(PLATFORM_BASE_URL + path)
      },
    }),
    '/lol/tournament/v4/providers': (path: string) => ({
      /** Creates a tournament provider and returns its ID. */
      post({ body }: ProviderRegistrationInput) {
        return axiosInstance.post<number>(PLATFORM_BASE_URL + path, body)
      },
    }),
    '/lol/tournament/v4/tournaments': (path: string) => ({
      /** Creates a tournament and returns its ID. */
      post({ body }: TournamentRegistrationInput) {
        return axiosInstance.post<number>(PLATFORM_BASE_URL + path, body)
      },
    }),
  }
}
