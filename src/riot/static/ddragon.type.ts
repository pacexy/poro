export type Image = {
  full: string
  sprite: string
  group: string
  x: number
  y: number
  w: number
  h: number
}

type ChampionName = string

// champion.json
export type ChampionJSON = {
  type: string
  format: string
  version: string
  data: {
    [championName: string]: BriefChampion
  }
}

export type BriefChampion = {
  version: string
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

// champion/[championName].json
export type ChampionNameJSON = {
  type: string
  format: string
  version: string
  data: {
    [championName: string]: Champion
  }
}

export type Champion = {
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

export type Skin = {
  id: string
  num: number
  name: string
  chromas: boolean
}

export type ChampionInfo = {
  attack: number
  defense: number
  magic: number
  difficulty: number
}

export type ChampionStats = {
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

export type Spell = {
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

export type Leveltip = {
  label: string[]
  effect: string[]
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Datavalues = {}

export type Passive = {
  name: string
  description: string
  image: Image
}

// item.json
export type ItemJSON = {
  type: string
  version: string
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

export type Item = {
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

export type Gold = {
  base: number
  total: number
  sell: number
  purchasable: boolean
}

export type ItemStats = {
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

export type ItemMaps = {
  '1': boolean
  '8': boolean
  '10': boolean
  '12': boolean
}

// summoner.json
export type SummonerJSON = {
  type: string
  version: string
  data: {
    [spellName: string]: SummonerSpell
  }
}

export type SummonerSpell = {
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

// profileicon.json
export type ProfileIconJSON = {
  type: string
  version: string
  data: {
    [profileIconId: string]: ProfileIcon
  }
}

export type ProfileIcon = {
  id: number
  image: Image
}

// runesReforged.json
export type RunesReforgedJSON = {
  id: number
  key: string
  icon: string
  name: string
  slots: {
    runes: Rune[]
  }[]
}[]

export type Rune = {
  id: number
  key: string
  icon: string
  name: string
  shortDesc: string
  longDesc: string
}

// map.json
export type MapJSON = {
  type: string
  version: string
  data: {
    [mapId: string]: Map
  }
}

export type Map = {
  MapName: string
  MapId: string
  image: Image
}

// language.json
export type LanguageJSON = {
  type: string
  version: string
  data: LanguageData
  tree: {
    searchKeyIgnore: string
    searchKeyRemap: any[]
  }
}

export type LanguageData = {
  Back: string
  Continue: string
  Language: string
  ItemInfo: string
  NextRank_: string
  Rank_: string
  PlayingAs: string
  PlayingAgainst: string
  CD_: string
  Range: string
  Range_: string
  Details_: string
  PrimaryRole: string
  mobileCompanion: string
  mobileForum: string
  mobileFriends: string
  mobilePleaseWait: string
  mobileNews: string
  modeClassic: string
  modeOdin: string
  modeAram: string
  modeTutorial: string
  modeOneforall: string
  modeFirstblood: string
  mode6v6: string
  modeCof: string
  Map1: string
  Map8: string
  Map10: string
  Map12: string
  categoryChampion: string
  categoryItem: string
  categoryMastery: string
  categoryRune: string
  categorySummoner: string
  Gold: string
  Level: string
  Abilities: string
  ChampionInfo: string
  Lore: string
  Stats: string
  Tips: string
  statAbility: string
  statAttack: string
  statDefense: string
  statDifficulty: string
  statUtility: string
  Assassin: string
  Fighter: string
  Marksman: string
  Mage: string
  Support: string
  Tank: string
  spells_Self: string
  spells_target_0: string
  spells_target_1: string
  spells_target_2: string
  spells_target_3: string
  spells_target_4: string
  spells_target_5: string
  spells_target_6: string
  spells_target_7: string
  spells_target_8: string
  spells_target_100: string
  AllItems: string
  Armor: string
  Attack: string
  AttackSpeed: string
  Consumable: string
  CooldownReduction: string
  CriticalStrike: string
  Damage: string
  Defense: string
  Health: string
  HealthRegen: string
  LifeSteal: string
  Magic: string
  Mana: string
  ManaRegen: string
  Movement: string
  SpellBlock: string
  SpellDamage: string
  Boots: string
  NonbootsMovement: string
  Tenacity: string
  SpellVamp: string
  GoldPer: string
  Slow: string
  Aura: string
  Active: string
  MagicPenetration: string
  ArmorPenetration: string
  colloq_Armor: string
  colloq_Attack: string
  colloq_AttackSpeed: string
  colloq_Consumables: string
  colloq_CriticalStrike: string
  colloq_Damage: string
  colloq_Defense: string
  colloq_Health: string
  colloq_HealthRegen: string
  colloq_LifeSteal: string
  colloq_Magic: string
  colloq_Mana: string
  colloq_ManaRegen: string
  colloq_Movement: string
  colloq_SpellBlock: string
  colloq_SpellDamage: string
  colloq_Consumable: string
  colloq_Boots: string
  colloq_NonbootsMovement: string
  colloq_CooldownReduction: string
  colloq_Tenacity: string
  colloq_SpellVamp: string
  colloq_GoldPer: string
  colloq_Slow: string
  colloq_Aura: string
  colloq_Active: string
  colloq_MagicPenetration: string
  colloq_ArmorPenetration: string
  RecommendedItems: string
  recommended_starting: string
  recommended_essential: string
  recommended_offensive: string
  recommended_defensive: string
  recommended_consumables: string
  Require_: string
  Cost_: string
  OriginalCost_: string
  SellsFor_: string
  UpgradeCost_: string
  Builds_: string
  ButtonBuy: string
  ButtonSell: string
  SpecialRecipeSmall: string
  SpecialRecipeLarge: string
  FlatArmorMod: string
  FlatAttackSpeedMod: string
  FlatBlockMod: string
  FlatCritChanceMod: string
  FlatCritDamageMod: string
  FlatEnergyPoolMod: string
  FlatEnergyRegenMod: string
  FlatEXPBonus: string
  FlatHPPoolMod: string
  FlatHPRegenMod: string
  FlatMagicDamageMod: string
  FlatMovementSpeedMod: string
  FlatMPPoolMod: string
  FlatMPRegenMod: string
  FlatPhysicalDamageMod: string
  FlatSpellBlockMod: string
  PercentArmorMod: string
  PercentAttackSpeedMod: string
  PercentBlockMod: string
  PercentCritChanceMod: string
  PercentCritDamageMod: string
  PercentDodgeMod: string
  PercentEXPBonus: string
  PercentHPPoolMod: string
  PercentHPRegenMod: string
  PercentMagicDamageMod: string
  PercentMovementSpeedMod: string
  PercentMPPoolMod: string
  PercentMPRegenMod: string
  PercentPhysicalDamageMod: string
  PercentSpellBlockMod: string
  rFlatArmorModPerLevel: string
  rFlatArmorPenetrationMod: string
  rFlatArmorPenetrationModPerLevel: string
  rFlatCritChanceModPerLevel: string
  rFlatCritDamageModPerLevel: string
  rFlatDodgeMod: string
  rFlatDodgeModPerLevel: string
  rFlatEnergyModPerLevel: string
  rFlatEnergyRegenModPerLevel: string
  rFlatGoldPer10Mod: string
  rFlatHPModPerLevel: string
  rFlatHPRegenModPerLevel: string
  rFlatMagicDamageModPerLevel: string
  rFlatMagicPenetrationMod: string
  rFlatMagicPenetrationModPerLevel: string
  rFlatMovementSpeedModPerLevel: string
  rFlatMPModPerLevel: string
  rFlatMPRegenModPerLevel: string
  rFlatPhysicalDamageModPerLevel: string
  rFlatSpellBlockModPerLevel: string
  rFlatTimeDeadMod: string
  rFlatTimeDeadModPerLevel: string
  rPercentArmorPenetrationMod: string
  rPercentArmorPenetrationModPerLevel: string
  rPercentAttackSpeedModPerLevel: string
  rPercentCooldownMod: string
  rPercentCooldownModPerLevel: string
  rPercentMagicPenetrationMod: string
  rPercentMagicPenetrationModPerLevel: string
  rPercentMovementSpeedModPerLevel: string
  rPercentTimeDeadMod: string
  rPercentTimeDeadModPerLevel: string
  PercentLifeStealMod: string
  PercentSpellVampMod: string
  masteryFerocity: string
  masteryCunning: string
  masteryResolve: string
  native_ar: string
  native_bg: string
  native_cs: string
  native_de: string
  native_el: string
  native_en: string
  native_es: string
  native_fr: string
  native_hu: string
  native_id: string
  native_it: string
  native_ja: string
  native_ko: string
  native_nl: string
  native_pl: string
  native_pt: string
  native_ro: string
  native_ru: string
  native_th: string
  native_tr: string
  native_vn: string
  native_zh: string
  native_zh_CN: string
  native_zh_MY: string
  native_zh_TW: string
}

// mission-assets.json
export type MissionAssetJSON = {
  type: string
  version: string
  data: {
    [missionName: string]: MissionAsset
  }
}

export type MissionAsset = {
  id: number
  image: Image
}

// sticker.json
export type StickerJSON = {
  type: string
  version: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: {}
}

// championFull.json
export type ChampionFullJSON = {
  type: string
  format: string
  version: string
  data: {
    [championName: string]: Champion
  }
  keys: {
    [championKey: string]: ChampionName
  }
}
