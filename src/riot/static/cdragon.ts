import { Version, VersionLanguage } from './utils'

export const CDRAGON_DOMAIN = 'cdn.communitydragon.org'
const CDRAGON_BASE_URL = `https://${CDRAGON_DOMAIN}`

export const RAW_CDRAGON_DOMAIN = 'raw.communitydragon.org'
const RAW_CDRAGON_BASE_URL = `https://${RAW_CDRAGON_DOMAIN}`

type ChampionId = string
type ChampionKey = number | string
type ChampionIDorKey = ChampionId | ChampionKey
type SkinId = number | string
type HonorId = number | string
type ProfileIconId = number | string
type WardId = number | string

class Champion extends Version {
  private readonly urlPrefix = CDRAGON_BASE_URL + `/${this.version}`

  squareIconPlaceholder = this.urlPrefix + '/champion/generic/square'

  squareIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/square`
  }
  championData(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/data`
  }
  baseSplashArt(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/splash-art`
  }
  splashArtWithSkin(championIDorKey: ChampionIDorKey, skinId: SkinId) {
    return (
      this.urlPrefix + `/champion/${championIDorKey}/splash-art/skin/${skinId}`
    )
  }
  baseCenteredSplashArt(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/splash-art/centered`
  }
  centeredSplashArtWithSkin(championIDorKey: ChampionIDorKey, skinId: SkinId) {
    return (
      this.urlPrefix +
      `/champion/${championIDorKey}/splash-art/centered/skin/${skinId}`
    )
  }
  baseTile(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/tile`
  }
  tileWithSkin(championIDorKey: ChampionIDorKey, skinId: SkinId) {
    return this.urlPrefix + `/champion/${championIDorKey}/tile/skin/${skinId}`
  }
  basePortrait(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/portrait`
  }
  portraitWithSkin(championIDorKey: ChampionIDorKey, skinId: SkinId) {
    return (
      this.urlPrefix + `/champion/${championIDorKey}/portrait/skin/${skinId}`
    )
  }
  passiveIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/ability-icon/passive`
  }
  qAbilityIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/ability-icon/q`
  }
  wAbilityIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/ability-icon/w`
  }
  eAbilityIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/ability-icon/e`
  }
  ultimateAbilityIcon(championIDorKey: ChampionIDorKey) {
    return this.urlPrefix + `/champion/${championIDorKey}/ability-icon/r`
  }
}

class ChampionSelect extends Version {
  private readonly urlPrefix = CDRAGON_BASE_URL + `/${this.version}`
  banSound(championIDorKey: ChampionIDorKey) {
    return (
      this.urlPrefix + `/champion/${championIDorKey}/champ-select/sounds/ban`
    )
  }
  lockinSound(championIDorKey: ChampionIDorKey) {
    return (
      this.urlPrefix + `/champion/${championIDorKey}/champ-select/sounds/choose`
    )
  }
  backgroundSound(championIDorKey: ChampionIDorKey) {
    return (
      this.urlPrefix + `/champion/${championIDorKey}/champ-select/sounds/sfx`
    )
  }
}

class Summoner extends Version {
  private readonly urlPrefix = CDRAGON_BASE_URL + `/${this.version}`
  honorEmblemPlaceholder = this.urlPrefix + '/honor/emblem/generic'

  honorEmblem(honorId: HonorId) {
    return this.urlPrefix + `/honor/emblem/${honorId}`
  }
  lockedHonorEmblem(honorId: HonorId) {
    return this.urlPrefix + `/honor/emblem/${honorId}/locked`
  }
  honorEmblemWithCheckpoints(honorId: HonorId, level: number) {
    return this.urlPrefix + `/honor/emblem/${honorId}/level/${level}`
  }
  profileIcon(profileIconId: ProfileIconId) {
    return this.urlPrefix + `/profile-icon/${profileIconId}`
  }
}
class Game extends Version {
  private readonly urlPrefix = CDRAGON_BASE_URL + `/${this.version}`
  wardIcon(wardId: WardId) {
    return this.urlPrefix + `/ward/${wardId}`
  }
  wardShadow(wardId: WardId) {
    return this.urlPrefix + `/ward/${wardId}/shadow`
  }
}

type MetaFile = 'queues'

export class CommunityDragon extends VersionLanguage {
  constructor(version: string, language: string) {
    super(version, language)
    // `latest` will not be affected
    this.version = this.version.split('.').slice(0, 2).join('.')
    this.language = this.language.toLowerCase()
    if (this.language === 'en_us') {
      this.language = 'default'
    }
  }
  champion = new Champion(this.version)
  championSelect = new ChampionSelect(this.version)
  summoner = new Summoner(this.version)
  game = new Game(this.version)

  meta(file: MetaFile) {
    return (
      RAW_CDRAGON_BASE_URL +
      `/${this.version}/plugins/rcp-be-lol-game-data/global/${this.language}/v1/${file}.json`
    )
  }
}
