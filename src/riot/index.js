/*! THIS FILE IS AUTO-GENERATED */

const axios = require('./axios')

const Account = require('./apis/account')
const ChampionMastery = require('./apis/champion_mastery')
const Summoner = require('./apis/summoner')
const Champion = require('./apis/champion')
const Clash = require('./apis/clash')
const LeagueExp = require('./apis/league_exp')
const League = require('./apis/league')
const LolStatus = require('./apis/lol_status')
const Match = require('./apis/match')
const Spectator = require('./apis/spectator')
const ThirdPartyCode = require('./apis/third_party_code')
const TournamentStub = require('./apis/tournament_stub')
const Tournament = require('./apis/tournament')

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
  Account,
  ChampionMastery,
  Summoner,
  Champion,
  Clash,
  LeagueExp,
  League,
  LolStatus,
  Match,
  Spectator,
  ThirdPartyCode,
  TournamentStub,
  Tournament,
}

module.exports = riot
