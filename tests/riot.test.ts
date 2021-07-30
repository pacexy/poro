import { riot } from '../src'

describe('static files', () => {
  it('general', () => {
    return riot.static.general.gameModes().then((res) => {
      expect(Array.isArray(res.data)).toBe(true)
    })
  })
  it('ddragon', () => {
    return riot.static.ddragon.realm('na').then((res) => {
      expect(res.data).toHaveProperty('cdn')
    })
  })
  it('cdragon', () => {
    return riot.static.cdragon.champion
      .championData('11.15.1', 'Heimerdinger')
      .then((res) => {
        expect(res.data).toHaveProperty('shortBio')
      })
  })
})

describe('api client', () => {
  it('league-exp', () => {
    const client = new riot.Client({
      auth: 'RGAPI-564972ce-02d6-4931-9020-6cfc540f56bd',
      platform: 'KR',
      region: 'AMERICAS',
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
