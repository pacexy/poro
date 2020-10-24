# poro

# **The Document Will Be Rewrited!**
> Integrate official Riot's League of Legends API with Leaguepedia API.

## Install

```sh
npm i poro
```

## Usage

```javascript
const { leaguepedia, riot } = require('poro')

// It is recommended to use await in an async function.
const matchSchedule = await leaguepedia.fetchMatchSchedule({
  where: [2020, 'LCS', 'Summer']
})
console.log(matchSchedule)

// You can also use callback instead.
leaguepedia.fetchMatchSchedule(, , (err, data) => {
  console.log(data)
})
```

## Parameters

In [Cargo query](https://lol.gamepedia.com/Special:CargoQuery),
you can see the parameters needed for a query.

In the implement of Poro, you don't need to specify `fields`,
it will always return all fields in a table.
If you want to see all fields of a table, go to
[Cargo tables](https://lol.gamepedia.com/Special:CargoTables),

Every fetcher has the same declaration, just like:

```javascript
function fetchSomethingInLeaguepedia(parameter, callback) {
  ...
}
```

All parameters for a query are placed in `parameter`.

`where` can be a string (should meet SQL syntax)
or an array of string (means keywords in `_pageName`). Use string when your
query condition is complex.

```typescript
parameter: {
  where?: string | string[]
  joinOn?: string
  groupBy?: string | string[]
  having?: string
  orderBy?: string | object | (string | object)[]
  limit?: number // default Number.MAX_SAFE_INTEGER
  offset?: number // default 0
  format?: string // default 'json'
}
```

## Example

```javascript
const matchSchedule = await leaguepedia.fetchMatchSchedule({
  where: `_pageName LIKE "%2020%" AND Team1 = "G2" OR MatchDay > 10`,
  groupBy: ['Team1', 'Team2'],
  orderBy: [{ field: 'DateTime_UTC', type: 'DESC' }, '_pageName'],
  limit: 100,
  offset: 50,
})
```
