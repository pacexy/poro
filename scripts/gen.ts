import { writeFileSync } from 'fs'
import { join } from 'path'

import prettier from 'prettier'

import { genEndpoints } from './riot'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require('../.prettierrc.js')

export async function main() {
  const result = await genEndpoints()

  writeFileSync(
    join(__dirname, '../src/riot/apis/dtos.ts'),
    prettier.format(result.dtos, {
      ...prettierConfig,
      parser: 'typescript',
    }),
  )
}

main()
