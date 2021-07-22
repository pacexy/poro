# poro

> Integrate official Riot's League of Legends API with Leaguepedia API.

## Install

```sh
npm i poro
```

## Usage

```ts
import { leaguepedia, riot } from 'poro'

const matchSchedule = await leaguepedia.fetch('MatchSchedule', {
  where: `_pageName LIKE "%2020%" AND Team1 = "G2" OR MatchDay > 10`,
  groupBy: 'Team1, Team2',
  orderBy: '_pageName DESC, Winner',
  limit: 100,
  offset: 50,
})
```

## Parameters

In [Cargo query](https://lol.fandom.com/wiki/Special:CargoQuery) (or [API sandbox](https://lol.fandom.com/wiki/Special:ApiSandbox)),
you can see the parameters needed for a query.

If you want to see all fields of a table, go to
[Cargo tables](https://lol.fandom.com/wiki/Special:CargoTables).

```typescript
interface Parameter {
  fields?: string // defaults to all
  where?: string
  joinOn?: string
  groupBy?: string
  having?: string
  orderBy?: string
  limit?: number // defaults to Number.MAX_SAFE_INTEGER
  offset?: number // defaults to 0
  format?: string // defaults to 'json'
}
```

## Axios Instance

Poro use `axios` as request library, you can get the axios instance by `leaguepedia.axiosInstance`
