import { generateRequestMethods } from '../utils/request'
import { GENERAL_BASE_URL } from './config'

const r = generateRequestMethods(GENERAL_BASE_URL)

/**
 * When looking up specific seasons, queues, maps and modes it is important
 * to use the correct ids.
 */
export default {
  /**
   * Season ids are used in match history to indicate which season a match
   * was played. A full list of season ids can be found in the file below.
   */
  seasons() {
    return r.get('/docs/lol/seasons.json')
  },
  /**
   * Queue ids show up in several places throughout the API and are used to
   * indicate which kind of match was played. A full list of queue ids can
   * be found in the file below.
   */
  queues() {
    return r.get('/docs/lol/queues.json')
  },
  /**
   * Map ids are used in match history to indicate which map a match was
   * played. A full list of map ids can be found in the file below.
   */
  maps() {
    return r.get('/docs/lol/maps.json')
  },
  /**
   * A full list of game modes can be found in the file below.
   */
  gameModes() {
    return r.get('/docs/lol/gameModes.json')
  },
  /**
   * A full list of game types can be found in the file below.
   */
  gameTypes() {
    return r.get('/docs/lol/gameTypes.json')
  },
}
