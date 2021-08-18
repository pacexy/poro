import { snakeCase } from 'lodash-es'

export const RAW_CDRAGON_DOMAIN = 'raw.communitydragon.org'
const RAW_CDRAGON_BASE_URL = `https://${RAW_CDRAGON_DOMAIN}`

export const CDRAGON_DOMAIN = 'cdn.communitydragon.org'
const CDRAGON_BASE_URL = `https://${CDRAGON_DOMAIN}`

type ChampionId = string
type ChampionKey = number | string
type ChampionIDorKey = ChampionId | ChampionKey
type SkinId = number | string
type HonorId = number | string
type ProfileIconId = number | string
type WardId = number | string

export const cdragon = {
  champion: {
    squareIconPlaceholder(patch: string) {
      return CDRAGON_BASE_URL + `/${patch}/champion/generic/square`
    },
    squareIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return CDRAGON_BASE_URL + `/${patch}/champion/${championIDorKey}/square`
    },
    championData(patch: string, championIDorKey: ChampionIDorKey) {
      return CDRAGON_BASE_URL + `/${patch}/champion/${championIDorKey}/data`
    },
    baseSplashArt(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL + `/${patch}/champion/${championIDorKey}/splash-art`
      )
    },
    splashArtWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/splash-art/skin/${skinId}`
      )
    },
    baseCenteredSplashArt(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/splash-art/centered`
      )
    },
    centeredSplashArtWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/splash-art/centered/skin/${skinId}`
      )
    },
    baseTile(patch: string, championIDorKey: ChampionIDorKey) {
      return CDRAGON_BASE_URL + `/${patch}/champion/${championIDorKey}/tile`
    },
    tileWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/tile/skin/${skinId}`
      )
    },
    basePortrait(patch: string, championIDorKey: ChampionIDorKey) {
      return CDRAGON_BASE_URL + `/${patch}/champion/${championIDorKey}/portrait`
    },
    portraitWithSkin(
      patch: string,
      championIDorKey: ChampionIDorKey,
      skinId: SkinId,
    ) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/portrait/skin/${skinId}`
      )
    },
    passiveIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/ability-icon/passive`
      )
    },
    qAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/ability-icon/q`
      )
    },
    wAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/ability-icon/w`
      )
    },
    eAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/ability-icon/e`
      )
    },
    ultimateAbilityIcon(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/ability-icon/r`
      )
    },
  },
  championSelect: {
    banSound(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/champ-select/sounds/ban`
      )
    },
    lockinSound(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/champ-select/sounds/choose`
      )
    },
    backgroundSound(patch: string, championIDorKey: ChampionIDorKey) {
      return (
        CDRAGON_BASE_URL +
        `/${patch}/champion/${championIDorKey}/champ-select/sounds/sfx`
      )
    },
  },
  summoner: {
    honorEmblemPlaceholder(patch: string) {
      return CDRAGON_BASE_URL + `/${patch}/honor/emblem/generic`
    },
    honorEmblem(patch: string, honorId: HonorId) {
      return CDRAGON_BASE_URL + `/${patch}/honor/emblem/${honorId}`
    },
    lockedHonorEmblem(patch: string, honorId: HonorId) {
      return CDRAGON_BASE_URL + `/${patch}/honor/emblem/${honorId}/locked`
    },
    honorEmblemWithCheckpoints(patch: string, honorId: HonorId, level: number) {
      return (
        CDRAGON_BASE_URL + `/${patch}/honor/emblem/${honorId}/level/${level}`
      )
    },
    profileIcon(patch: string, profileIconId: ProfileIconId) {
      return CDRAGON_BASE_URL + `/${patch}/profile-icon/${profileIconId}`
    },
    spell(version: string, spellName: string) {
      return (
        RAW_CDRAGON_BASE_URL +
        `/${version}/game/data/spells/icons2d/${snakeCase(spellName)}.png`
      )
    },
  },
  game: {
    wardIcon(patch: string, wardId: WardId) {
      return CDRAGON_BASE_URL + `/${patch}/ward/${wardId}`
    },
    wardShadow(patch: string, wardId: WardId) {
      return CDRAGON_BASE_URL + `/${patch}/ward/${wardId}/shadow`
    },
  },
}
