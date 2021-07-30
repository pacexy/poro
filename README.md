# poro

- Leaguepedia API
- Riot League of Legends API
- CommunityDragon
- Data Dragon

## Install

```sh
npm i poro
```

You can update leaguepedia schema with:

```sh
npm run poro
```

## Usage

### Leaguepedia

```ts
import { leaguepedia } from 'poro'

async function doSomething() {
  // specify fields
  const teams = await leaguepedia.fetch({
    tables: ['Teams'],
    fields: ['Teams.Name', 'Teams.Region'],
  })
  // filter
  const g2 = await leaguepedia.fetch({
    tables: ['Teams'],
    where: 'Teams.Name = "G2 Esports"',
  })
  // join on
  const broadcastMusicUsages = await leaguepedia.fetch({
    tables: ['BroadcastMusicUsages', 'BroadcastMusicTracks'],
    joinOn: [
      {
        left: 'BroadcastMusicUsages.TrackID',
        right: 'BroadcastMusicTracks.TrackID',
      },
    ],
  })
  // group
  const proplayers = await leaguepedia.fetch({
    tables: ['Pentakills'],
    groupBy: ['Pentakills.Name'],
    having: 'COUNT(DateDisplay) > 10',
  })
}
```

### Riot

```ts
import { riot } from 'poro'

async function doSomething() {
  // General
  const gameModes = await riot.static.general.gameModes()
  // Data Dragon
  const realm = await riot.static.ddragon.realm('na')
  // Community Dragon
  const champion = await riot.static.cdragon.champion.championData(
    '11.15.1',
    'Heimerdinger',
  )

  // APIs
  const client = new riot.Client({
    auth: 'RGAPI-564972ce-02d6-4931-9020-6cfc540f56bd',
    platform: 'KR',
    region: 'AMERICAS',
  })
  const leagueEntries = await client
    .path('/lol/league-exp/v4/entries/{queue}/{tier}/{division}', {
      queue: 'RANKED_SOLO_5x5',
      tier: 'CHALLENGER',
      division: 'I',
    })
    .get({ query: { page: 1 } })
}
```

## Leaguepedia

In [Cargo query](https://lol.fandom.com/wiki/Special:CargoQuery) (or [API sandbox](https://lol.fandom.com/wiki/Special:ApiSandbox)),
you can see the parameters needed for a query.

If you want to see all fields of a table, go to
[Cargo tables](https://lol.fandom.com/wiki/Special:CargoTables).

```typescript
interface JoinOn {
  left: Field
  right: Field
}

interface OrderBy {
  field: Field
  desc?: boolean // defaults to `false`
}

interface Parameter {
  tables: Table[]
  fields?: Field[] // defaults to all fields
  where?: string
  joinOn?: JoinOn[]
  groupBy?: Field[]
  having?: string
  orderBy?: OrderBy[] // defaults to `[{ field: `${tables[0]}._pageName` }]`
  limit?: number // defaults to `Number.MAX_SAFE_INTEGER`
  offset?: number // defaults to `0`
  format?: string // defaults to 'json'
}
```

## Axios Instance

Poro use `axios` as request library, you can get the axios instance by `leaguepedia.axiosInstance`, `riot.static.axiosInstance`, `client.axiosInstance`.

## Credits

The Riot API client is inspired by [Building Strongly Typed REST Clients with TypeScript
](https://www.youtube.com/watch?v=aZ6nnGlfBG8) ([repository](https://github.com/joheredi/openjs-world-2021)).
