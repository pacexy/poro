# poro

> Integrate official Riot's League of Legends API with Leaguepedia API.

## Install

```sh
npm i poro
```

You can update leaguepedia schema (as-needed) with:

```sh
npm run poro
```

## Usage

```ts
import { leaguepedia, riot } from 'poro'

const matchSchedule = await leaguepedia.fetch('MatchSchedule', {
  where: `MatchSchedule._pageName LIKE "%2020%" AND MatchSchedule.Team1 = "G2" OR MatchSchedule.MatchDay > 10`,
  groupBy: ['MatchSchedule.Team1'],
  orderBy: [{ field: 'MatchSchedule._pageName', desc: true }],
})
```

## Parameters

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

Poro use `axios` as request library, you can get the axios instance by `leaguepedia.axiosInstance`
