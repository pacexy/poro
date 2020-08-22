const path = require('path')
const log4js = require('log4js')

const LOG_PATH = path.resolve(`${process.cwd()}/log/poro`)

function generateLogPath(module) {
  return path.resolve(LOG_PATH, `${module}.log`)
}

const configuration = {
  appenders: {
    default: { type: 'file', filename: generateLogPath('default') },
    riot: { type: 'file', filename: generateLogPath('riot') },
    leaguepedia: { type: 'file', filename: generateLogPath('leaguepedia') },
  },
  categories: {
    default: { appenders: ['default'], level: 'info' },
    riot: { appenders: ['riot'], level: 'info' },
    leaguepedia: { appenders: ['leaguepedia'], level: 'info' },
  },
}

log4js.configure(configuration)

module.exports = {
  riotLogger: log4js.getLogger('riot'),
  leaguepediaLogger: log4js.getLogger('leaguepedia'),
}
