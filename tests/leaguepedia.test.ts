import { leaguepedia } from '../src'

describe('fetch leaguepedia table items', () => {
  it('single table', () => {
    return leaguepedia
      .fetch({
        tables: ['Alphabets'],
        limit: 3,
        offset: 2,
      })
      .then((data) => {
        expect(data).toHaveLength(3)
      })
  })

  it('specified fields', () => {
    return leaguepedia
      .fetch({
        tables: ['Teams'],
        fields: ['Teams.Name', 'Teams.Region'],
        limit: 2,
      })
      .then((data) => {
        data.forEach((item) => {
          expect(item).not.toHaveProperty('_pageName')
        })
      })
  })

  it('where', () => {
    return leaguepedia
      .fetch({
        tables: ['Teams'],
        where: 'Teams.Name = "G2 Esports"',
      })
      .then((data) => {
        expect(data).toHaveLength(1)
      })
  })

  it('single join on left table', () => {
    return leaguepedia
      .fetch({
        tables: ['BroadcastMusicUsages', 'BroadcastMusicTracks'],
        joinOn: [
          {
            left: 'BroadcastMusicUsages.TrackID',
            right: 'BroadcastMusicTracks.TrackID',
          },
        ],
        limit: 2,
      })
      .then((data) => {
        expect(data).toHaveLength(2)
      })
  })

  it('multiple join on left tables', () => {
    return leaguepedia
      .fetch({
        tables: ['MatchSchedule', 'Teams', 'Regions'],
        joinOn: [
          {
            left: 'MatchSchedule.Team1',
            right: 'Teams.Name',
          },
          {
            left: 'Teams.Region',
            // autocomplete can't exclude fields perfectly
            right: 'Regions.RegionMedium',
          },
        ],
        limit: 2,
      })
      .then((data) => {
        expect(data).toHaveLength(2)
      })
  })

  it('group by and having', () => {
    return leaguepedia
      .fetch({
        tables: ['Pentakills'],
        groupBy: ['Pentakills.Name'],
        having: 'COUNT(DateDisplay) > 10',
      })
      .then((data) => {
        expect(data.length).toBeGreaterThan(0)
      })
  })
})
