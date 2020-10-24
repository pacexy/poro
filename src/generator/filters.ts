import _ from 'lodash'
import compose from 'lodash/fp/compose'

export const PascalCase = compose(_.upperFirst, _.camelCase)
