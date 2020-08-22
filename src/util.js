const { JSDOM } = require('jsdom')

const BASE_URL = 'https://lol.gamepedia.com/Module:CargoDeclare/'

function getTag(value) {
  const toString = Object.prototype.toString
  return toString.call(value)
}

function getType(value) {
  const tag = getTag(value)
  return /\[object (.+)\]/.exec(tag)[1]
}

function cargo2JSON(cargoStr) {
  return cargoStr
    .replace(/^./, '[')
    .replace(/,\n\}\n/, '\n]')
    .replace(/field =/g, '"field":')
    .replace(/type =/g, '"type":')
    .replace(/desc =/g, '"desc":')
}

async function fetchModule(table) {
  const { window } = await JSDOM.fromURL(`${BASE_URL}${table}`)
  const moduleInCargo = window.document.querySelector('.mw-highlight')
    .textContent
  const moduleInJson = cargo2JSON(moduleInCargo.replace('return ', ''))

  return JSON.parse(moduleInJson)
}

fetchModule('ScoreboardGames')

module.exports = {
  getType,
  fetchModule,
}
