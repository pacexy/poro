const _ = require('lodash')
const compose = require('lodash/fp/compose')

const PascalCase = compose(_.upperFirst, _.camelCase)

module.exports = {
  PascalCase,
}
