import { generateRequestMethods } from '../axios'

export const CDRAGON_BASE_URL = `https://cdn.communitydragon.org`
const r = generateRequestMethods(CDRAGON_BASE_URL)

type ChampionId = string
type ChampionKey = number | string
type ChampionIDorKey = ChampionId | ChampionKey
type SkinId = number | string
type HonorId = number | string
type ProfileIconId = number | string
type WardId = number | string

export default {
  champion: {
    squareIconPlaceholder(patch: string) {
      return `/${patch}/champion/generic/square`
    },
    squareIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/square`
    },
    championData(patch: string, championIDorKey: ChampionIDorKey) {
      return r.get(`/${patch}/champion/${championIDorKey}/data`)
    },
    baseSplashArt(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/splash-art`
    },
    splashArtWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return `/${patch}/champion/${championIDorKey}/splash-art/skin/${skinId}`
    },
    baseCenteredSplashArt(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/splash-art/centered`
    },
    centeredSplashArtWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return `/${patch}/champion/${championIDorKey}/splash-art/centered/skin/${skinId}`
    },
    baseTile(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/tile`
    },
    tileWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return `/${patch}/champion/${championIDorKey}/tile/skin/${skinId}`
    },
    basePortrait(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/portrait`
    },
    portraitWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return `/${patch}/champion/${championIDorKey}/portrait/skin/${skinId}`
    },
    passiveIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/passive`
    },
    qAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/q`
    },
    wAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/w`
    },
    eAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/e`
    },
    ultimateAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/r`
    },
  },
  championSelect: {
    banSound(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/ban`
    },
    lockinSound(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/choose`
    },
    backgroundSound(patch: string, championIDorKey: ChampionIDorKey) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/sfx`
    },
  },
  summoner: {
    honorEmblemPlaceholder(patch: string) {
      return `/${patch}/honor/emblem/generic`
    },
    honorEmblem(patch: string, honorId: HonorId) {
      return `/${patch}/honor/emblem/${honorId}`
    },
    lockedHonorEmblem(patch: string, honorId: HonorId) {
      return `/${patch}/honor/emblem/${honorId}/locked`
    },
    honorEmblemWithCheckpoints(patch: string, honorId: HonorId, level: number) {
      return `/${patch}/honor/emblem/${honorId}/level/${level}`
    },
    profileIcon(patch: string, profileIconId: ProfileIconId) {
      return `/${patch}/profile-icon/${profileIconId}`
    },
  },
  game: {
    wardIcon(patch: string, wardId: WardId) {
      return `/${patch}/ward/${wardId}`
    },
    wardShadow(patch: string, wardId: WardId) {
      return `/${patch}/ward/${wardId}/shadow`
    },
  },
}