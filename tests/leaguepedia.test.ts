import { CargoClient } from '../src'

describe('cargoQuery leaguepedia table items', () => {
  it('single table', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: ['Alphabets'],
        limit: 3,
        offset: 2,
      })
      .then(({ data }) => {
        expect(data).toHaveLength(3)
      })
  })

  it('specified fields', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: ['Teams'],
        fields: ['Teams.Name', 'Teams.Region'],
        limit: 2,
      })
      .then(({ data }) => {
        data.forEach((item) => {
          expect(item).not.toHaveProperty('_pageName')
        })
      })
  })

  it('where', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: ['Teams'],
        where: 'Teams.Name = "G2 Esports"',
      })
      .then(({ data }) => {
        expect(data).toHaveLength(1)
      })
  })

  it('single join on left table', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: ['Tournaments', 'ScoreboardGames'],
        fields: ['ScoreboardGames.Team1', 'Tournaments.Name'],
        joinOn: [
          {
            left: 'Tournaments.OverviewPage',
            right: 'ScoreboardGames.OverviewPage',
          },
        ],
        limit: 1,
      })
      .then(({ data }) => {
        expect(data[0]).toHaveProperty('Team1')
        expect(data[0]).toHaveProperty('Name')
      })
  })

  it('multiple join on left tables', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: [
          'ScoreboardGames',
          'Tournaments',
          'Leagues',
          'MatchScheduleGame',
          'MatchSchedule',
          'PicksAndBansS7',
        ],
        joinOn: [
          {
            left: 'Tournaments.League',
            right: 'Leagues.League',
          },
          {
            left: 'ScoreboardGames.OverviewPage',
            right: 'Tournaments.OverviewPage',
          },
          {
            left: 'ScoreboardGames.GameId',
            right: 'MatchScheduleGame.GameId',
          },

          {
            left: 'MatchScheduleGame.MatchId',
            right: 'MatchSchedule.MatchId',
          },
          {
            left: 'ScoreboardGames.GameId',
            right: 'PicksAndBansS7.GameId',
          },
        ],
        fields: [
          'MatchScheduleGame.OverviewPage',
          'ScoreboardGames.GameId',
          'ScoreboardGames.Team1',
          'ScoreboardGames.Team2',
          'ScoreboardGames.Winner',
          'ScoreboardGames.N_GameInMatch',
          'ScoreboardGames.Gamelength',
          'ScoreboardGames.Patch',
          'ScoreboardGames.RiotPlatformGameId',
          'MatchSchedule.DateTime_UTC',
          'PicksAndBansS7.Team1Role1', // Not in response
        ],
        limit: 1,
      })
      .then(({ data }) => {
        expect(data[0]).toHaveProperty('OverviewPage')
        expect(data[0]).toHaveProperty('GameId')
        expect(data[0]).toHaveProperty('DateTime_UTC')
        expect(data[0]).toHaveProperty('Team1Role1')
      })
  })

  it('group by and having', () => {
    const cargo = new CargoClient()
    return cargo
      .query({
        tables: ['Pentakills'],
        groupBy: ['Pentakills.Name'],
        having: 'COUNT(DateDisplay) > 10',
      })
      .then(({ data }) => {
        expect(data.length).toBeGreaterThan(0)
      })
  })

  it('spaceToUnderscore', () => {
    const cargo = new CargoClient({ metadataPrefix: 'CargoClient' })
    return cargo
      .query({
        tables: ['GCDArchive'],
        limit: 1,
      })
      .then(({ data }) => {
        expect(data[0]).toHaveProperty('Diff_URL')
      })
  })

  it('metadataPrefix', () => {
    const cargo = new CargoClient({ metadataPrefix: 'cargo' })
    return cargo
      .query({
        tables: ['Teams'],
        limit: 10,
      })
      .then(({ data }) => {
        expect(typeof data[0].cargo_ID === 'number').toBe(true)
      })
  })

  it('data convertion', () => {
    const cargo = new CargoClient({ metadataPrefix: 'cargo' })
    return cargo
      .query({
        tables: ['Players'],
        limit: 5,
      })
      .then(({ data }) => {
        expect(data.some((player) => player.Birthdate instanceof Date)).toBe(
          true,
        )
        expect(data.every((player) => Array.isArray(player.FavChamps))).toBe(
          true,
        )
      })
  })
})
