/*! THIS FILE IS AUTO-GENERATED */

import axios from './axios'

// General
import General from './general'

// Data Dragon
import DDragon from './ddragon'

// APIs
import Account from './apis/account'
import Champion from './apis/champion'
import ChampionMastery from './apis/champion_mastery'
import Clash from './apis/clash'
import League from './apis/league'
import LeagueExp from './apis/league_exp'
import LolStatus from './apis/lol_status'
import Match from './apis/match'
import Spectator from './apis/spectator'
import Summoner from './apis/summoner'
import ThirdPartyCode from './apis/third_party_code'
import Tournament from './apis/tournament'
import TournamentStub from './apis/tournament_stub'

export default {
  setAuth(auth: any) {
    axios.defaults.headers.common['X-Riot-Token'] = auth
  },
  setAxiosRequestInterceptor(fulfilled: any, rejected: any) {
    axios.interceptors.request.use(fulfilled, rejected)
  },
  setAxiosResponseInterceptor(fulfilled: any, rejected: any) {
    axios.interceptors.response.use(fulfilled, rejected)
  },
  General,
  DDragon,
  API: {
    Account,
    Champion,
    ChampionMastery,
    Clash,
    League,
    LeagueExp,
    LolStatus,
    Match,
    Spectator,
    Summoner,
    ThirdPartyCode,
    Tournament,
    TournamentStub,
  },
}
