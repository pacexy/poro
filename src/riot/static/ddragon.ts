const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com'

/**
 * Data Dragon
 *
 * Data Dragon is our way of centralizing League of Legends game data and
 * assets, including champions, items, runes, summoner spells, and profile
 * icons. All of which can be used by third-party developers. You can download
 * a compressed tarball (.tgz) for each patch which will contain all assets
 * for that patch. Please be aware that updating Data Dragon after each League
 * of Legends patch is a manual process, so it is not always updated immediately
 * after a patch.
 */
export const ddragon = {
  /**
   * You can find all valid Data Dragon versions in the versions file.
   * Typically there's only a single build of Data Dragon for a given patch,
   * however occasionally there will be additional builds. This typically
   * occurs when there's an error in the original build. As such, you should
   * always use the most recent Data Dragon version for a given patch for the
   * best results.
   */
  versions: DDRAGON_BASE_URL + '/api/versions.json',
  /**
   * Data Dragon versions aren't always equivalent to the League of Legends
   * client version in a region. You can find the version each region is using
   * via the realms files.
   */
  realm(region: string) {
    return DDRAGON_BASE_URL + `/realms/${region}.json`
  },
  /**
   * Data Dragon provides localized versions of each of the data files in
   * languages supported by the client. Below is a list of the languages
   * supported by Data Dragon, which you can also retrieved from the Data
   * Dragon languages file.
   */
  languages: DDRAGON_BASE_URL + '/cdn/languages.json',
  /**
   * The `champion.json` data file returns a list of champions with a brief summary.
   */
  champions(version: string, language: string) {
    return DDRAGON_BASE_URL + `/cdn/${version}/data/${language}/champion.json`
  },
  /**
   * The individual champion JSON files contain additional data for each champion.
   */
  champion(version: string, language: string, championId: string) {
    return (
      DDRAGON_BASE_URL +
      `/cdn/${version}/data/${language}/champion/${championId}.json`
    )
  },
  /**
   * Data Dragon also provides the same level of detail for every item in the
   * game. Within Data Dragon you can find info such as the item's description,
   * purchase value, sell value, items it builds from, items it builds into,
   * and stats granted from the item.
   */
  items(version: string, language: string) {
    return DDRAGON_BASE_URL + `/cdn/${version}/data/${language}/item.json`
  },

  summonerSpells(version: string, language: string) {
    return DDRAGON_BASE_URL + `/cdn/${version}/data/${language}/summoner.json`
  },

  profileicons(version: string, language: string) {
    return (
      DDRAGON_BASE_URL + `/cdn/${version}/data/${language}/profileicon.json`
    )
  },

  runesReforged(version: string, language: string) {
    return (
      DDRAGON_BASE_URL + `/cdn/${version}/data/${language}/runesReforged.json`
    )
  },
}
