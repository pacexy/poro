import { writeFileSync } from 'fs'
import { join } from 'path'

import prettier from 'prettier'

import { genApis } from './riot'

const prettierConfig = require('../.prettierrc.js')

export async function main() {
  const result = await genApis()

  writeFileSync(
    join(__dirname, '../src/riot/apis/dtos.ts'),
    prettier.format(result.dtos, {
      ...prettierConfig,
      parser: 'typescript',
    }),
  )
}

main()
