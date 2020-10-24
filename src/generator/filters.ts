const _ = require('lodash')
const compose = require('lodash/fp/compose')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PascalCase... Remove this comment to see the full error message
const PascalCase = compose(_.upperFirst, _.camelCase)

module.exports = {
  PascalCase,
}
