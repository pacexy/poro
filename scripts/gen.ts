import { genEndpoints } from './riot'
import { writeSchema } from './utils'

export async function main() {
  const result = await genEndpoints()

  writeSchema(
    './riot/endpoints',
    [
      `export function createEndpoints(limiter: RiotRateLimiter) {`,
      `  return {`,
      result.content,
      `  }`,
      `}`,
    ].join('\n'),
  )

  writeSchema(
    './riot/dtos',
    [`import { Queue, Tier, Division } from './enums'`, result.dtos].join(
      '\n\n',
    ),
  )
}

main()
