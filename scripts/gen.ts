import { writeFileSync } from 'fs'
import { join } from 'path'

import prettier from 'prettier'

import { genEndpoints } from './riot'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require('../.prettierrc.js')

export async function main() {
  const result = await genEndpoints()

  writeFileSync(
    join(__dirname, `../schemas/riot/endpoints_${Date.now()}.ts`),
    prettier.format(
      [
        `export function createEndpoints(limiter: RiotRateLimiter) {`,
        `  return {`,
        result.content,
        `  }`,
        `}`,
      ].join('\n'),
      {
        ...prettierConfig,
        parser: 'typescript',
      },
    ),
  )

  writeFileSync(
    join(__dirname, `../schemas/riot/dtos_${Date.now()}.ts`),
    prettier.format(
      [`import { Queue, Tier, Division } from './enums'`, result.dtos].join(
        '\n\n',
      ),
      {
        ...prettierConfig,
        parser: 'typescript',
      },
    ),
  )
}

main()
