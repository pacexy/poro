export interface Season {
  id: number
  season: string
}

/** 5v5 Blind Pick games, 5v5 Ranked Solo games... */
export interface Queue {
  queueId: number
  map: string
  description?: string
  notes?: string
}

export interface Map {
  mapId: number
  mapName: string
  notes: string
}

/** CLASSIC, ARAM, URF... */
export interface GameMode {
  gameMode: string
  description: string
}

/** CUSTOM_GAME, TUTORIAL_GAME, MATCHED_GAME */
export interface GameType {
  gametype: string
  description: string
}

export type Version = string

export interface Realm {
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

export interface Champions {
  type: string
  format: string
  version: Version
  data: {
    [championName: string]: BriefChampion
  }
}

export interface BriefChampion {
  version: Version
  id: string
  key: string
  name: string
  title: string
  blurb: string
  info: ChampionInfo
  image: Image
  tags: string[]
  partype: string
  stats: ChampionStats
}

export interface Champion {
  type: string
  format: string
  version: Version
  data: {
    [championName: string]: {
      id: string
      key: string
      name: string
      title: string
      image: Image
      skins: Skin[]
      lore: string
      blurb: string
      allytips: string[]
      enemytips: string[]
      tags: string[]
      partype: string
      info: ChampionInfo
      stats: ChampionStats
      spells: Spell[]
      passive: Passive
      recommended: any[]
    }
  }
}

export interface Image {
  full: string
  sprite: string
  group: string
  x: number
  y: number
  w: number
  h: number
}

export interface Skin {
  id: string
  num: number
  name: string
  chromas: boolean
}

export interface ChampionInfo {
  attack: number
  defense: number
  magic: number
  difficulty: number
}

export interface ChampionStats {
  hp: number
  hpperlevel: number
  mp: number
  mpperlevel: number
  movespeed: number
  armor: number
  armorperlevel: number
  spellblock: number
  spellblockperlevel: number
  attackrange: number
  hpregen: number
  hpregenperlevel: number
  mpregen: number
  mpregenperlevel: number
  crit: number
  critperlevel: number
  attackdamage: number
  attackdamageperlevel: number
  attackspeedperlevel: number
  attackspeed: number
}

export interface Spell {
  id: string
  name: string
  description: string
  tooltip: string
  leveltip: Leveltip
  maxrank: number
  cooldown: number[]
  cooldownBurn: string
  cost: number[]
  costBurn: string
  datavalues: Datavalues
  effect: number[] | undefined[]
  effectBurn: string | undefined[]
  vars: any[]
  costType: string
  maxammo: string
  range: number[]
  rangeBurn: string
  image: Image
  resource: string
}

export interface Leveltip {
  label: string[]
  effect: string[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Datavalues {}

export interface Passive {
  name: string
  description: string
  image: Image
}

export interface Items {
  type: string
  version: Version
  basic: {
    name: string
    rune: {
      isrune: boolean
      tier: number
      type: string
    }
    gold: Gold
    group: string
    description: string
    colloq: string
    plaintext: string
    consumed: boolean
    stacks: number
    depth: number
    consumeOnFull: boolean
    from: any[]
    into: any[]
    specialRecipe: number
    inStore: boolean
    hideFromAll: boolean
    requiredChampion: string
    requiredAlly: string
    stats: ItemStats
    tags: any[]
    maps: ItemMaps
  }
  data: {
    [itemId: string]: Item
  }
  groups: {
    id: string
    MaxGroupOwnable: string
  }[]
  tree: {
    header: string
    tags: string[]
  }[]
}

export interface Item {
  name: string
  description: string
  colloq: string
  plaintext: string
  into: string[]
  image: Image
  gold: Gold
  tags: string[]
  maps: ItemMaps
  stats: ItemStats
}

export interface Gold {
  base: number
  total: number
  sell: number
  purchasable: boolean
}

export interface ItemStats {
  FlatHPPoolMod: number
  rFlatHPModPerLevel: number
  FlatMPPoolMod: number
  rFlatMPModPerLevel: number
  PercentHPPoolMod: number
  PercentMPPoolMod: number
  FlatHPRegenMod: number
  rFlatHPRegenModPerLevel: number
  PercentHPRegenMod: number
  FlatMPRegenMod: number
  rFlatMPRegenModPerLevel: number
  PercentMPRegenMod: number
  FlatArmorMod: number
  rFlatArmorModPerLevel: number
  PercentArmorMod: number
  rFlatArmorPenetrationMod: number
  rFlatArmorPenetrationModPerLevel: number
  rPercentArmorPenetrationMod: number
  rPercentArmorPenetrationModPerLevel: number
  FlatPhysicalDamageMod: number
  rFlatPhysicalDamageModPerLevel: number
  PercentPhysicalDamageMod: number
  FlatMagicDamageMod: number
  rFlatMagicDamageModPerLevel: number
  PercentMagicDamageMod: number
  FlatMovementSpeedMod: number
  rFlatMovementSpeedModPerLevel: number
  PercentMovementSpeedMod: number
  rPercentMovementSpeedModPerLevel: number
  FlatAttackSpeedMod: number
  PercentAttackSpeedMod: number
  rPercentAttackSpeedModPerLevel: number
  rFlatDodgeMod: number
  rFlatDodgeModPerLevel: number
  PercentDodgeMod: number
  FlatCritChanceMod: number
  rFlatCritChanceModPerLevel: number
  PercentCritChanceMod: number
  FlatCritDamageMod: number
  rFlatCritDamageModPerLevel: number
  PercentCritDamageMod: number
  FlatBlockMod: number
  PercentBlockMod: number
  FlatSpellBlockMod: number
  rFlatSpellBlockModPerLevel: number
  PercentSpellBlockMod: number
  FlatEXPBonus: number
  PercentEXPBonus: number
  rPercentCooldownMod: number
  rPercentCooldownModPerLevel: number
  rFlatTimeDeadMod: number
  rFlatTimeDeadModPerLevel: number
  rPercentTimeDeadMod: number
  rPercentTimeDeadModPerLevel: number
  rFlatGoldPer10Mod: number
  rFlatMagicPenetrationMod: number
  rFlatMagicPenetrationModPerLevel: number
  rPercentMagicPenetrationMod: number
  rPercentMagicPenetrationModPerLevel: number
  FlatEnergyRegenMod: number
  rFlatEnergyRegenModPerLevel: number
  FlatEnergyPoolMod: number
  rFlatEnergyModPerLevel: number
  PercentLifeStealMod: number
  PercentSpellVampMod: number
}

export interface ItemMaps {
  '1': boolean
  '8': boolean
  '10': boolean
  '12': boolean
}

export interface SummonerSpells {
  type: string
  version: Version
  data: {
    [spellName: string]: SummonerSpell
  }
}

export interface SummonerSpell {
  id: string
  name: string
  description: string
  tooltip: string
  maxrank: number
  cooldown: number[]
  cooldownBurn: string
  cost: number[]
  costBurn: string
  datavalues: Datavalues
  effect: number[] | undefined[]
  effectBurn: string | undefined[]
  vars: any[]
  key: string
  summonerLevel: number
  modes: string[]
  costType: string
  maxammo: string
  range: number[]
  rangeBurn: string
  image: Image
  resource: string
}

export interface ProfileIcons {
  type: string
  version: Version
  data: {
    [profileIconId: string]: ProfileIcon
  }
}

export interface ProfileIcon {
  id: number
  image: Image
}

export interface RuneReforged {
  id: number
  key: string
  icon: string
  name: string
  slots: {
    runes: Rune[]
  }[]
}

export interface Rune {
  id: number
  key: string
  icon: string
  name: string
  shortDesc: string
  longDesc: string
}
