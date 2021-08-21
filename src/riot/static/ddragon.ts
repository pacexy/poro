import { Version, VersionLanguage } from './utils'

export const DDRAGON_DOMAIN = 'ddragon.leagueoflegends.com'
export const DDRAGON_BASE_URL = `https://${DDRAGON_DOMAIN}`

class Image extends Version {
  private readonly urlPrefix = DDRAGON_BASE_URL + `/cdn/${this.version}`
  private readonly ext = '.png'

  spell(spellName: string) {
    const filename = spellName.endsWith(this.ext)
      ? spellName
      : spellName + this.ext
    return this.urlPrefix + `/img/spell/${filename}`
  }
}

type MetaFile =
  | `champion/${string}`
  | 'champion'
  | 'championFull'
  | 'item'
  | 'language'
  | 'map'
  | 'mission-assets'
  | 'profileicon'
  | 'runesReforged'
  | 'sticker'
  | 'summoner'

export class DataDragon extends VersionLanguage {
  meta(file: MetaFile) {
    return (
      DDRAGON_BASE_URL +
      `/cdn/${this.version}/data/${this.language}/${file}.json`
    )
  }
  image = new Image(this.version)
}
