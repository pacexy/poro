import { general, ddragon, cdragon, Client, Riot } from '../src'

describe('static files', () => {
  it('general', () => {
    expect(general.gameModes).toBe(
      'https://static.developer.riotgames.com/docs/lol/gameModes.json',
    )
  })
  it('ddragon', () => {
    expect(ddragon.realm('na')).toBe(
      'https://ddragon.leagueoflegends.com/realms/na.json',
    )
  })
  it('cdragon', () => {
    expect(cdragon.summoner.profileIcon('latest', '1')).toBe(
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
