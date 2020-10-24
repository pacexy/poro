/*! THIS FILE IS AUTO-GENERATED */

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'axios'.
const axios = require('./axios')

// General
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'General'.
const General = require('./general/general')

// Data Dragon
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'DDragon'.
const DDragon = require('./ddragon/ddragon')

// APIs
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Account'.
const Account = require('./apis/account')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Champion'.
const Champion = require('./apis/champion')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ChampionMa... Remove this comment to see the full error message
const ChampionMastery = require('./apis/champion_mastery')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Clash'.
const Clash = require('./apis/clash')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'League'.
const League = require('./apis/league')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'LeagueExp'... Remove this comment to see the full error message
const LeagueExp = require('./apis/league_exp')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'LolStatus'... Remove this comment to see the full error message
const LolStatus = require('./apis/lol_status')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Match'.
const Match = require('./apis/match')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Spectator'... Remove this comment to see the full error message
const Spectator = require('./apis/spectator')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Summoner'.
const Summoner = require('./apis/summoner')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ThirdParty... Remove this comment to see the full error message
const ThirdPartyCode = require('./apis/third_party_code')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tournament... Remove this comment to see the full error message
const Tournament = require('./apis/tournament')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tournament... Remove this comment to see the full error message
const TournamentStub = require('./apis/tournament_stub')

const riot = {
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

module.exports = riot
