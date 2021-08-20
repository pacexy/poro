import { DDRAGON_BASE_URL } from './ddragon'

const GENERAL_BASE_URL = 'https://static.developer.riotgames.com'

/**
 * When looking up specific seasons, queues, maps and modes it is important
 * to use the correct ids.
 */
export const general = {
  /**
   * Season ids are used in match history to indicate which season a match
   * was played. A full list of season ids can be found in the file below.
   */
  seasons: GENERAL_BASE_URL + '/docs/lol/seasons.json',
  /**
   * Queue ids show up in several places throughout the API and are used to
   * indicate which kind of match was played. A full list of queue ids can
   * be found in the file below.
   */
  queues: GENERAL_BASE_URL + '/docs/lol/queues.json',
  /**
   * Map ids are used in match history to indicate which map a match was
   * played. A full list of map ids can be found in the file below.
   */
  maps: GENERAL_BASE_URL + '/docs/lol/maps.json',
  /**
   * A full list of game modes can be found in the file below.
   */
  gameModes: GENERAL_BASE_URL + '/docs/lol/gameModes.json',
  /**
   * A full list of game types can be found in the file below.
   */
  gameTypes: GENERAL_BASE_URL + '/docs/lol/gameTypes.json',
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
    return DDRAGON_BASE_URL + `/realms/${region.toLowerCase()}.json`
  },
  /**
   * Data Dragon provides localized versions of each of the data files in
   * languages supported by the client. Below is a list of the languages
   * supported by Data Dragon, which you can also retrieved from the Data
   * Dragon languages file.
   */
  languages: DDRAGON_BASE_URL + '/cdn/languages.json',
}
