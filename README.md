# poro
> Integrate official Riot's League of Legends API (not implemented yet) with Leaguepedia API.

## Install
```sh
npm i poro
```

## Usage
```javascript
const Poro = require('poro')

const poro = new Poro()

// It is recommended to use await in an async function.
const matchSchedule = await poro.fetchMatchSchedule([2020, 'LCS', 'Summer'])
console.log(matchSchedule)

// You can also use callback instead.
poro.fetchMatchSchedule(, , (err, data) => {
  console.log(data)
})
```

## Parameters
In [Cargo query](https://lol.gamepedia.com/Special:CargoQuery), 
you can see the parameters needed for a query.

In the implement of Poro, you don't need to specify ``fields``,
it will always return all fields in a table. 
If you want to see all fields of a table, go to
[Cargo tables](https://lol.gamepedia.com/Special:CargoTables),

Every fetcher has the same declaration, just like:
```javascript
function fetchSomethingInLeaguepedia(where, common, callback) {
  ...
}
```
The first parameter is ``where``, it can be a string (should meet SQL syntax)
or an array of string (means keywords in ``_pageName``). Use string when your
query condition is complex.
```typescript
where: string | string[]
```

Other query parameters are placed in ``common``:
```typescript
common: {
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
const matchSchedule = await fetchMatchSchedule(
  `_pageName LIKE "%2020%" AND Team1 = "G2" OR MatchDay > 10`,
  {
    groupBy: ['Team1', 'Team2'],
    orderBy: [
      { field: 'DateTime_UTC', type: 'DESC' },
      '_pageName'
    ],
    limit: 100,
    offset: 50,
  }
)
```