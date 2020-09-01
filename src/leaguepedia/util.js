function getTag(value) {
  const toString = Object.prototype.toString
  return toString.call(value)
}

function getType(value) {
  const tag = getTag(value)
  return /\[object (.+)\]/.exec(tag)[1]
}

module.exports = {
  getType,
}
