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

async function fetchFields(table) {
  try {
    const { window } = await JSDOM.fromURL(`${BASE_URL}${table}`)
    const moduleInCargo = window.document.querySelector('.mw-highlight')
      .textContent
    const capturedGroups = Array.from(
      moduleInCargo.matchAll(/field = .(\w+?).,/g),
    )
    const fields = capturedGroups.map((capturedGroup) => capturedGroup[1])

    return fields
  } catch (e) {
    console.log(table, e)
  }
}

module.exports = {
  getType,
  fetchFields,
}
