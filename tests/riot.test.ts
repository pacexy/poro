import { general, DataDragon, CommunityDragon, Client, Riot } from '../src'

describe('static files', () => {
  it('general', () => {
    expect(general.gameModes).toBe(
      'https://static.developer.riotgames.com/docs/lol/gameModes.json',
    )
    expect(general.realm('na')).toBe(
      'https://ddragon.leagueoflegends.com/realms/na.json',
    )
  })
  it('ddragon', () => {
    const ddragon = new DataDragon('11.16.1', 'en_US')
    expect(ddragon.meta('summoner')).toBe(
      'https://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/summoner.json',
    )
  })
  it('cdragon', () => {
    const cdragon = new CommunityDragon('latest', 'default')
    expect(cdragon.summoner.profileIcon('1')).toBe(
      'https://cdn.communitydragon.org/latest/profile-icon/1',
    )
  })
})

describe('api client', () => {
  it('league-exp', () => {
    const client = new Client({
      auth: 'RGAPI-564972ce-02d6-4931-9020-6cfc540f56bd',
      platform: Riot.Platform.KR,
      region: Riot.Region.ASIA,
    })

    return client
      .path('/lol/league-exp/v4/entries/{queue}/{tier}/{division}', {
        queue: 'RANKED_SOLO_5x5',
        tier: 'CHALLENGER',
        division: 'I',
      })
      .get({ query: {} })
      .then((res) => {
        expect(Array.isArray(res.data)).toBe(true)
      })
  })
})

describe('set region/platform correctly', () => {
  it('default region', () => {
    const client = new Client({
      auth: '',
    })

    return client
      .path('/riot/account/v1/accounts/me')
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Region.AMERICAS.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/me`,
        )
      })
  })

  it('default platform', () => {
    const client = new Client({
      auth: '',
    })

    return client
      .path(
        '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}',
        { encryptedSummonerId: '123' },
      )
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Platform.NA.toLowerCase()}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/123`,
        )
      })
  })

  it('class-scoped region', () => {
    const client = new Client({
      auth: '',
      region: Riot.Region.ASIA,
    })

    return client
      .path('/riot/account/v1/accounts/me')
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Region.ASIA.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/me`,
        )
      })
  })

  it('class-scoped platform', () => {
    const client = new Client({
      auth: '',
      platform: Riot.Platform.KR,
    })

    return client
      .path(
        '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}',
        { encryptedSummonerId: '123' },
      )
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Platform.KR.toLowerCase()}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/123`,
        )
      })
  })

  it('method-scoped region', () => {
    const client = new Client({
      auth: '',
      region: Riot.Region.EUROPE,
    })

    return client
      .path('/riot/account/v1/accounts/me', Riot.Region.ASIA)
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Region.ASIA.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/me`,
        )
      })
  })

  it('method-scoped platform', () => {
    const client = new Client({
      auth: '',
      platform: Riot.Platform.RU,
    })

    return client
      .path(
        '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}',
        { encryptedSummonerId: '123' },
        Riot.Platform.KR,
      )
      .get()
      .catch((err) => {
        expect(err.config.url).toBe(
          `https://${Riot.Platform.KR.toLowerCase()}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/123`,
        )
      })
  })
})
