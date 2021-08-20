import { Version } from './utils'

export const CDRAGON_DOMAIN = 'cdn.communitydragon.org'
const CDRAGON_BASE_URL = `https://${CDRAGON_DOMAIN}`

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

export class CommunityDragon extends Version {
  champion = new Champion(this.version)
  championSelect = new ChampionSelect(this.version)
  summoner = new Summoner(this.version)
  game = new Game(this.version)
}
