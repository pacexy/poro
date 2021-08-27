import { Cargo } from '../src'

describe('cargoQuery leaguepedia table items', () => {
  it('single table', () => {
    const cargo = new Cargo()
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
    const cargo = new Cargo()
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
    const cargo = new Cargo()
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
    const cargo = new Cargo()
    return cargo
      .query({
        tables: ['BroadcastMusicUsages', 'BroadcastMusicTracks'],
        joinOn: [
          {
            left: 'BroadcastMusicUsages.TrackID',
            right: 'BroadcastMusicTracks.TrackID',
          },
        ],
        limit: 2,
      })
      .then(({ data }) => {
        expect(data).toHaveLength(2)
      })
  })

  it('multiple join on left tables', () => {
    const cargo = new Cargo()
    return cargo
      .query({
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
      .then(({ data }) => {
        expect(data).toHaveLength(2)
      })
  })

  it('group by and having', () => {
    const cargo = new Cargo()
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
    const cargo = new Cargo({ metadataPrefix: 'Cargo' })
    return cargo
      .query({
        tables: ['GCDArchive'],
        limit: 1,
      })
      .then(({ data }) => {
        expect(typeof data[0].Diff_URL === 'string').toBe(true)
      })
  })

  it('metadataPrefix', () => {
    const cargo = new Cargo({ metadataPrefix: 'cargo' })
    return cargo
      .query({
        tables: ['Teams'],
        limit: 10,
      })
      .then(({ data }) => {
        expect(typeof data[0].cargo_ID === 'number').toBe(true)
      })
  })
})
