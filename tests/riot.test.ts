import { general, DataDragon, CommunityDragon, Client, Riot } from '../src'

import { auth } from './env'

jest.setTimeout(240 * 1000)

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
      auth,
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
      .then(({ data }) => {
        expect(Array.isArray(data)).toBe(true)
      })
  })
})

describe('set region/platform correctly', () => {
  it('default region', () => {
    const client = new Client({
      auth: 'mock',
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
      auth: 'mock',
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
      auth: 'mock',
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
      auth: 'mock',
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
      auth: 'mock',
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
      auth: 'mock',
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

describe('rate limit', () => {
  it('spread strategy', () => {
    const client = new Client({ auth })

    let i = 0
    const promises: Promise<any>[] = []

    const startTime = Date.now()
    let lastResolveTime = startTime

    while (i++ < 30) {
      const promise = client
        .path('/lol/spectator/v4/featured-games')
        .get()
        .then(() => {
          const now = Date.now()
          expect(now - lastResolveTime).toBeGreaterThanOrEqual(0)
          lastResolveTime = now
        })

      promises.push(promise)
    }

    return Promise.all(promises)
  })
})
