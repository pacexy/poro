export type Season = {
  id: number
  season: string
}

/** 5v5 Blind Pick games, 5v5 Ranked Solo games... */
export type Queue = {
  queueId: number
  map: string
  description?: string
  notes?: string
}

export type Map = {
  mapId: number
  mapName: string
  notes: string
}

/** CLASSIC, ARAM, URF... */
export type GameMode = {
  gameMode: string
  description: string
}

/** CUSTOM_GAME, TUTORIAL_GAME, MATCHED_GAME */
export type GameType = {
  gametype: string
  description: string
}

export type Version = string

export type Realm = {
  n: {
    item: Version
    rune: Version
    mastery: Version
    summoner: Version
    champion: Version
    profileicon: Version
    map: Version
    language: Version
    sticker: Version
  }
  v: Version
  l: Language
  cdn: string
  dd: Version
  lg: Version
  css: Version
  profileiconmax: number
  store: any
}

export type Language = string
