import { describe, it, expect } from 'vitest'

import { fetchApiNames, genEndpoints, genApis } from './riot'

describe('generate-riot-client', () => {
  it('should generate API names', async () => {
    expect(fetchApiNames()).resolves.toMatchInlineSnapshot(`
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
        "lor-deck-v1",
        "lor-inventory-v1",
        "lor-match-v1",
        "lor-ranked-v1",
        "lor-status-v1",
        "match-v5",
        "spectator-v4",
        "summoner-v4",
        "tft-league-v1",
        "tft-match-v1",
        "tft-status-v1",
        "tft-summoner-v1",
        "tournament-stub-v5",
        "tournament-v5",
        "val-content-v1",
        "val-match-v1",
        "val-ranked-v1",
        "val-status-v1",
      ]
    `)
  })

  it('should generate endpoints', async () => {
    expect(await genEndpoints('account-v1')).toMatchInlineSnapshot(`
      {
        "content": "
          // #region ACCOUNT-V1
            '/riot/account/v1/accounts/by-puuid/{puuid}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({
      /** Get account by puuid */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
        },
      }),'/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({
      /** Get account by riot id */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
        },
      }),'/riot/account/v1/accounts/me': (generalRegion: GeneralRegion, realPath: string, path: string) => ({
      /** Get account by access token */
      get() {
        return limiter.execute<AccountDto>(generalRegion, realPath, path)
        },
      }),'/riot/account/v1/active-shards/by-game/{game}/by-puuid/{puuid}': (generalRegion: GeneralRegion, realPath: string, path: string) => ({
      /** Get active shard for a player */
      get() {
        return limiter.execute<ActiveShardDto>(generalRegion, realPath, path)
        },
      }),
          // #endregion
          ",
        "dtos": "
          // #region ACCOUNT-V1
            export interface AccountDto  {
        puuid: string
      /** This field may be excluded from the response if the account doesn't have a gameName. */
      gameName: string
      /** This field may be excluded from the response if the account doesn't have a tagLine. */
      tagLine: string
      }
          // #endregion
          ",
      }
    `)
  })

  it(
    'should run',
    async () => {
      const result = await genApis()
      expect(result.content).toMatchFileSnapshot('riot-client.ts')
      expect(result.dtos).toMatchFileSnapshot('riot-client-dtos.ts')
    },
    { timeout: Infinity },
  )
})
