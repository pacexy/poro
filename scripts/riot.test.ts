import { describe, it, expect } from 'vitest'

import { fetchPageNames, genEndpoints } from './riot'

describe('generate-riot-client', () => {
  it('should generate page names', async () => {
    expect(fetchPageNames()).resolves.toMatchInlineSnapshot(`
      [
        "account-v1",
        "champion-mastery-v4",
        "champion-v3",
        "clash-v1",
        "league-exp-v4",
        "league-v4",
        "lol-challenges-v1",
        "lol-status-v3",
        "lol-status-v4",
        "match-v5",
        "spectator-v4",
        "summoner-v4",
      ]
    `)
  })

  it(
    'should generate endpoints',
    async () => {
      const result = await genEndpoints()
      expect(result.content).toMatchFileSnapshot('__snapshots__/endpoints.ts')
      expect(result.dtos).toMatchFileSnapshot('__snapshots__/dtos.ts')
    },
    { timeout: Infinity },
  )
})
