import { generateRequestMethods } from '../axios'

export const CDRAGON_BASE_URL = `https://cdn.communitydragon.org`
const r = generateRequestMethods(CDRAGON_BASE_URL)

export default {
  champion: {
    squareIconPlaceholder(patch: string) {
      return `/${patch}/champion/generic/square`
    },
    squareIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/square`
    },
    championData(patch: string, championIDorKey: string) {
      return r.get(`/${patch}/champion/${championIDorKey}/data`)
    },
    baseSplashArt(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/splash-art`
    },
    splashArtWithSkin(
      patch: string,
      championIDorKey: string,
      skinId: number | string,
    ) {
      return `/${patch}/champion/${championIDorKey}/splash-art/skin/${skinId}`
    },
    baseCenteredSplashArt(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/splash-art/centered`
    },
    centeredSplashArtWithSkin(
      patch: string,
      championIDorKey: string,
      skinId: number | string,
    ) {
      return `/${patch}/champion/${championIDorKey}/splash-art/centered/skin/${skinId}`
    },
    baseTile(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/tile`
    },
    tileWithSkin(
      patch: string,
      championIDorKey: string,
      skinId: number | string,
    ) {
      return `/${patch}/champion/${championIDorKey}/tile/skin/${skinId}`
    },
    basePortrait(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/portrait`
    },
    portraitWithSkin(
      patch: string,
      championIDorKey: string,
      skinId: number | string,
    ) {
      return `/${patch}/champion/${championIDorKey}/portrait/skin/${skinId}`
    },
    passiveIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/passive`
    },
    qAbilityIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/q`
    },
    wAbilityIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/w`
    },
    eAbilityIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/e`
    },
    ultimateAbilityIcon(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/ability-icon/r`
    },
  },
  championSelect: {
    banSound(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/ban`
    },
    lockinSound(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/choose`
    },
    backgroundSound(patch: string, championIDorKey: string) {
      return `/${patch}/champion/${championIDorKey}/champ-select/sounds/sfx`
    },
  },
  summoner: {
    honorEmblemPlaceholder(patch: string) {
      return `/${patch}/honor/emblem/generic`
    },
    honorEmblem(patch: string, honorId: number | string) {
      return `/${patch}/honor/emblem/${honorId}`
    },
    lockedHonorEmblem(patch: string, honorId: number | string) {
      return `/${patch}/honor/emblem/${honorId}/locked`
    },
    honorEmblemWithCheckpoints(
      patch: string,
      honorId: number | string,
      level: number,
    ) {
      return `/${patch}/honor/emblem/${honorId}/level/${level}`
    },
    profileIcon(patch: string, profileIconId: number | string) {
      return `/${patch}/profile-icon/${profileIconId}`
    },
  },
  game: {
    wardIcon(patch: string, wardId: number | string) {
      return `/${patch}/ward/${wardId}`
    },
    wardShadow(patch: string, wardId: number | string) {
      return `/${patch}/ward/${wardId}/shadow`
    },
  },
}
