function getTag(value: any) {
  const toString = Object.prototype.toString
  return toString.call(value)
}

export function getType(value: any) {
  const tag = getTag(value)
  return /\[object (.+)\]/.exec(tag)![1]
}
