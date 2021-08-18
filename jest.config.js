/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  testPathIgnorePatterns: ['dist'],
  // https://github.com/nrwl/nx/issues/812#issuecomment-680970609
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
}
