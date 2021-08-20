import { Version, VersionLanguage } from './utils'

export const DDRAGON_DOMAIN = 'ddragon.leagueoflegends.com'
export const DDRAGON_BASE_URL = `https://${DDRAGON_DOMAIN}`

class Meta extends VersionLanguage {
  private readonly urlPrefix =
    DDRAGON_BASE_URL + `/cdn/${this.version}/data/${this.language}`

  champions = this.urlPrefix + '/champion.json'

  champion(championId: string) {
    return this.urlPrefix + `/champion/${championId}.json`
  }

  items = this.urlPrefix + '/item.json'

  summonerSpells = this.urlPrefix + '/summoner.json'

  profileicons = this.urlPrefix + '/profileicon.json'

  runesReforged = this.urlPrefix + '/runesReforged.json'
}

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

export class DataDragon extends VersionLanguage {
  meta = new Meta(this.version, this.language.replace('-', '_'))
  image = new Image(this.version)
}
