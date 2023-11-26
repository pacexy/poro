import { genSchema } from './cargo'
import { genEndpoints } from './riot'
import { writeSchema } from './utils'

enum Mode {
  Cargo = 1 << 0,
  RIOT = 1 << 1,
  ALL = Cargo | RIOT,
}

main()

function main() {
  // Extract the command line arguments
  const args = process.argv.slice(2)

  // Parse the arguments
  const parsedArgs = args.reduce((acc, arg) => {
    const [key, value] = arg.split('=')
    if (key.startsWith('--')) {
      acc[key.slice(2)] = value
    }
    return acc
  }, {} as Record<string, string>)

  // Use the parsed argument
  const mode = Number(parsedArgs.mode)

  if (mode & Mode.Cargo) {
    genCargo()
  }
  if (mode & Mode.RIOT) {
    genRiot()
  }
}

export async function genCargo() {
  const schema = await genSchema()
  writeSchema('./cargo/schema', schema)
}

export async function genRiot() {
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
