/*! THIS FILE IS AUTO-GENERATED */

const axios = require('./axios')

// General
const General = require('./general/general')

// Data Dragon
const DDragon = require('./ddragon/ddragon')

// APIs
const Account = require('./apis/account')
const Champion = require('./apis/champion')
const ChampionMastery = require('./apis/champion_mastery')
const Clash = require('./apis/clash')
const League = require('./apis/league')
const LeagueExp = require('./apis/league_exp')
const LolStatus = require('./apis/lol_status')
const Match = require('./apis/match')
const Spectator = require('./apis/spectator')
const Summoner = require('./apis/summoner')
const ThirdPartyCode = require('./apis/third_party_code')
const Tournament = require('./apis/tournament')
const TournamentStub = require('./apis/tournament_stub')

const riot = {
  setAuth(auth) {
    axios.defaults.headers.common['X-Riot-Token'] = auth
  },
  setAxiosRequestInterceptor(fulfilled, rejected) {
    axios.interceptors.request.use(fulfilled, rejected)
  },
  setAxiosResponseInterceptor(fulfilled, rejected) {
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

module.exports = riot
