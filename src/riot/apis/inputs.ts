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

export type GetTopChampionMasteriesInput = {
  query: {
    /** Number of entries to retrieve, defaults to 3. */
    count?: number
  }
}

export type GetChallengeLeaderboardsInput = {
  query: {
    limit?: number
  }
}
