import { general, DataDragon, CommunityDragon, RiotClient, Riot } from '../src'

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
    expect(cdragon.tier(Riot.Tier.CHALLENGER)).toBe(
      'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/challenger.png',
    )
  })
})

describe('api client', () => {
  it('league-exp', () => {
    const client = new RiotClient({
      auth,
      platform: Riot.Platform.KR,
      region: Riot.Region.ASIA,
    })

    return client
      .path('/lol/league-exp/v4/entries/{queue}/{tier}/{division}', {
        queue: Riot.Queue.RANKED_SOLO_5x5,
        tier: Riot.Tier.CHALLENGER,
        division: Riot.Division.I,
      })
      .get({ query: {} })
      .then(({ data }) => {
        expect(Array.isArray(data)).toBe(true)
      })
  })
})

describe('set region/platform correctly', () => {
  it('default region', () => {
    const client = new RiotClient({
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
    const client = new RiotClient({
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
    const client = new RiotClient({
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
    const client = new RiotClient({
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
    const client = new RiotClient({
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
    const client = new RiotClient({
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
  it('app < method', () => {
    // App rate limit: 100:120 spread to 1:1200ms
    const client = new RiotClient({ auth })
    const promises: Promise<any>[] = []
    let lastResolveTime = Date.now()

    for (let i = 0; i < 5; i++) {
      // Method rate limit: 1200000:600 spread to 1:0.5ms
      const promise = client
        .path('/lol/spectator/v4/featured-games')
        .get()
        .then(() => {
          const now = Date.now()
          if (i !== 0) {
            expect(now - lastResolveTime).toBeGreaterThanOrEqual(1200)
          }
          lastResolveTime = now
        })

      promises.push(promise)
    }

    return Promise.all(promises)
  })

  it('app > method', () => {
    // App rate limit: 100:120 spread to 1:1200ms
    const client = new RiotClient({ auth })
    const promises: Promise<any>[] = []
    let lastResolveTime = Date.now()

    for (let i = 0; i < 5; i++) {
      // Method rate limit: 10:60 spread to 1:6000ms
      const promise = client
        .path('/lol/clash/v1/tournaments')
        .get()
        .then(() => {
          const now = Date.now()
          if (i !== 0) {
            expect(now - lastResolveTime).toBeGreaterThanOrEqual(6000)
          }
          lastResolveTime = now
        })

      promises.push(promise)
    }

    return Promise.all(promises)
  })

  it('multiple regions', () => {
    const client = new RiotClient({ auth })
    const promises: Promise<any>[] = []

    Object.values(Riot.Platform).forEach((platform) => {
      let lastResolveTime = Date.now()
      for (let i = 0; i < 5; i++) {
        const promise = client
          .path('/lol/spectator/v4/featured-games', platform)
          .get()
          .then(() => {
            const now = Date.now()
            if (i !== 0) {
              expect(now - lastResolveTime).toBeGreaterThanOrEqual(1200)
            }
            lastResolveTime = now
          })

        promises.push(promise)
      }
    })

    return Promise.all(promises)
  })

  it('multiple methods', () => {
    const client = new RiotClient({ auth })
    const promises: Promise<any>[] = []

    const startTime = Date.now()

    for (let i = 0; i < 5; i++) {
      const promise = client.path('/lol/spectator/v4/featured-games').get()
      promises.push(promise)
    }

    for (let i = 0; i < 5; i++) {
      const promise = client.path('/lol/clash/v1/tournaments').get()
      promises.push(promise)
    }

    return Promise.all(promises).then(() => {
      const now = Date.now()
      expect(now - startTime).toBeGreaterThan(30 * 1000)
    })
  })
})
