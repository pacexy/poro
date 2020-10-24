function getTag(value: any) {
  const toString = Object.prototype.toString
  return toString.call(value)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getType'.
function getType(value: any) {
  const tag = getTag(value)
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  return /\[object (.+)\]/.exec(tag)[1]
}

module.exports = {
  getType,
}
