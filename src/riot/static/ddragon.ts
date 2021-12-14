import { Image, MetaFile } from './ddragon.type'
import { VersionLanguage } from './utils'

export const DDRAGON_DOMAIN = 'ddragon.leagueoflegends.com'
export const DDRAGON_BASE_URL = `https://${DDRAGON_DOMAIN}`

export class DataDragon extends VersionLanguage {
  private readonly prefixImmutable = DDRAGON_BASE_URL + `/cdn`
  private readonly prefix = DDRAGON_BASE_URL + `/cdn/${this.version}`

  meta(file: MetaFile) {
    return this.prefix + `/data/${this.language}/${file}.json`
  }
  image(img: Pick<Image, 'group' | 'full'>) {
    return this.prefix + `/img/${img.group}/${img.full}`
  }
  imageImmutable(path: string) {
    return this.prefixImmutable + '/img/' + path
  }
}
