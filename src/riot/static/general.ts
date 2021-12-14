import { Platform } from '../apis/enums'

import { DDRAGON_BASE_URL } from './ddragon'
import { DocFile } from './general.type'

/**
 * When looking up specific seasons, queues, maps and modes it is important
 * to use the correct ids.
 */
export const general = {
  doc(file: DocFile) {
    return `https://static.developer.riotgames.com/docs/lol/${file}.json`
  },
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
    const platforms = Object.values(Platform)
    const platformIndex = platforms.findIndex((platform) => platform === region)
    const platformName = Object.keys(Platform)[platformIndex] ?? region
    return DDRAGON_BASE_URL + `/realms/${platformName.toLowerCase()}.json`
  },
  /**
   * Data Dragon provides localized versions of each of the data files in
   * languages supported by the client. Below is a list of the languages
   * supported by Data Dragon, which you can also retrieved from the Data
   * Dragon languages file.
   */
  languages: DDRAGON_BASE_URL + '/cdn/languages.json',
}
