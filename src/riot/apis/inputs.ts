import {
  ProviderRegistrationParameters,
  TournamentCodeParameters,
  TournamentCodeUpdateParameters,
  TournamentRegistrationParameters,
} from './dtos'

export type LeagueEntryInput = {
  query: {
    /** Defaults to 1. Starts with page 1. */
    page?: number
  }
}

export type MatchIdsInput = {
  query: {
    /** Filter the list of match ids by a specific queue id. This filter is mutually inclusive of the type filter meaning any match ids returned must match both the queue and type filters. */
    queue?: number
    /** Filter the list of match ids by the type of match. This filter is mutually inclusive of the queue filter meaning any match ids returned must match both the queue and type filters. */
    type?: string
    /** Defaults to 0. Start index. */
    start?: number
    /** Defaults to 20. Valid values: 0 to 100. Number of match ids to return. */
    count?: number
  }
}

export type SummonerInput = {
  header: {
    /** Bearer token */
    Authorization?: string
  }
}

export type TournamentCodeInput = {
  query: {
    /** The number of codes to create (max 1000) */
    count?: number
    /** The tournament ID */
    tournamentId: number
  }
  body: TournamentCodeParameters
}

export type TournamentCodeUpdateInput = {
  body: TournamentCodeUpdateParameters
}

export type ProviderRegistrationInput = {
  body: ProviderRegistrationParameters
}

export type TournamentRegistrationInput = {
  body: TournamentRegistrationParameters
}
