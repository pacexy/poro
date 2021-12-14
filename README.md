# poro

- Leaguepedia API
- Riot League of Legends API
- Community Dragon
- Data Dragon

## Install

```sh
npm i poro
```

## Usage

### Leaguepedia

```ts
import { CargoClient } from 'poro'

const cargo = new CargoClient()
// specify fields
const teams = await cargo.query({
  tables: ['Teams'],
  fields: ['Teams.Name', 'Teams.Region'],
})
// filter
const g2 = await cargo.query({
  tables: ['Teams'],
  where: 'Teams.Name = "G2 Esports"',
})
// join on
const broadcastMusicUsages = await cargo.query({
  tables: ['BroadcastMusicUsages', 'BroadcastMusicTracks'],
  joinOn: [
    {
      left: 'BroadcastMusicUsages.TrackID',
      right: 'BroadcastMusicTracks.TrackID',
    },
  ],
})
// group
const proplayers = await cargo.query({
  tables: ['Pentakills'],
  groupBy: ['Pentakills.Name'],
  having: 'COUNT(DateDisplay) > 10',
})
```

### Riot

```ts
import { RiotClient, Riot } from 'poro'

const riot = new RiotClient({
  auth: 'RIOT-API-KEY',
  platform: Riot.Platform.KR,
  region: Riot.Region.ASIA,
})
const leagueEntries = await riot
  .path('/lol/league-exp/v4/entries/{queue}/{tier}/{division}', {
    queue: Riot.Queue.RANKED_SOLO_5x5,
    tier: Riot.Tier.CHALLENGER,
    division: Riot.Division.I,
  })
  .get({ query: { page: 1 } })
```

### General Data

```ts
import { general, Riot } from 'poro'

// https://static.developer.riotgames.com/docs/lol/gameModes.json
const gameModes = await axios<Riot.General.GameModes>(general.doc('gameModes'))

// https://ddragon.leagueoflegends.com/realms/na.json
const realm = await axios<Riot.General.Realm>(general.realm('na'))
```

### Data Dragon

```ts
import { DataDragon, Riot } from 'poro'

const ddragon = new DataDragon('11.16.1', 'en_US')

// https://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/summoner.json
const summoner = await axios<Riot.Data.SummonerJSON>(ddragon.meta('summoner'))
```

### Community Dragon

```ts
import { CommunityDragon, Riot } from 'poro'

const cdragon = new CommunityDragon('latest', 'default')

// https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-regalia/challenger.png
cdragon.tier(Riot.Tier.CHALLENGER)
```

## APIs

`CargoClient` and `RiotClient` are designed for server side and use axios to send requests.

Types are out of box, so you don't have to define them yourself.

### Leaguepedia

> You can get the axios instance with `cargo.axiosInstance`.

```ts
interface CargoClientOptions {
  // Prefix to field names starting with '_' (like '_ID', '_pageName', etc.)
  metadataPrefix?: string
}
```

See the parameters needed for a query in [Cargo query](https://lol.fandom.com/wiki/Special:CargoQuery) (or [API sandbox](https://lol.fandom.com/wiki/Special:ApiSandbox))

See all fields of a table in
[Cargo tables](https://lol.fandom.com/wiki/Special:CargoTables).

```ts
interface CargoQueryParameter {
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

interface JoinOn {
  left: Field
  right: Field
}

interface OrderBy {
  field: Field
  desc?: boolean // defaults to `false`
}
```

### Riot

> You can get the axios instance with `riot.axiosInstance`.

```ts
interface RiotClientConfig extends LimiterConfig {
  // Riot API KEY
  auth: string
  // Instance-scoped platform
  platform?: Platform
  // Instance-scoped region
  region?: Region
}

interface LimiterConfig {
  // Concurrency for each region
  concurrency?: number
  // If `true`, display debug info.
  // If 'mock', display debug info and mock requests.
  debug?: boolean | 'mock'
}
```

Sometime you need method-scoped `platform` and `region`. Add it as the last parameter in `path` method and it will override the instance-scoped one.

```ts
riot.path(
  '/lol/summoner/v4/summoners/{encryptedSummonerId}',
  { encryptedSummonerId: '...' },
  Riot.Platform.KR,
)
```

## Credits

The Riot API client is inspired by [Building Strongly Typed REST Clients with TypeScript
](https://www.youtube.com/watch?v=aZ6nnGlfBG8) ([repository](https://github.com/joheredi/openjs-world-2021)).
