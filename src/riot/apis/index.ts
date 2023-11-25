import axios from 'axios'
import axiosRetry from 'axios-retry'

import { createEndpoints } from './endpoints'
import { Platform, Region } from './enums'
import { GeneralRegion, LimiterConfig, RiotRateLimiter } from './rate-limiter'

type Endpoints = ReturnType<typeof createEndpoints>

// Input: '/lol/league/v4/entries/{queue}/{tier}/{division}'
// Output: 'queue' | 'tier' | 'division'
type PathParametersUnion<P> =
  P extends `${string}{${infer Parameter}}${infer Tail}`
    ? Parameter | PathParametersUnion<Tail>
    : never

const regionScopedPathPrefix = ['/riot', '/lol/match/v5'] as const
type RegionScopedPathPrefix = typeof regionScopedPathPrefix[number]
type OriginPrefix<P> = P extends `${RegionScopedPathPrefix}${string}`
  ? [prefix?: Region]
  : [platform?: Platform]

// Input: '/lol/league/v4/entries/{queue}/{tier}/{division}'
// Output: [queue: string, tier: string, division: string, platform?: Platform]
type UrlParameters<P> = PathParametersUnion<P> extends never
  ? [...OriginPrefix<P>]
  : [
      {
        [key in PathParametersUnion<P>]: string | number
      },
      ...OriginPrefix<P>
    ]

// type-safe Object.keys
function keys<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}

interface RiotClientConfig extends LimiterConfig {
  auth: string
  platform?: Platform
  region?: Region
}

export class RiotClient {
  readonly axiosInstance = axios.create()
  private readonly limiter
  private readonly endpoints
  private readonly platform
  private readonly region

  constructor({ auth, platform, region, ...limiterConfig }: RiotClientConfig) {
    this.axiosInstance.defaults.headers.common['X-Riot-Token'] = auth
    this.limiter = new RiotRateLimiter(this.axiosInstance, limiterConfig)
    this.endpoints = createEndpoints(this.limiter)
    this.platform = platform
    this.region = region

    axiosRetry(this.axiosInstance, {
      retryCondition(err) {
        const errCodes = ['ECONNRESET', 'ETIMEDOUT']
        const statusCodes = [403, 429, 503]
        const errCode = err.code ?? ''
        const statusCode = err.response?.status ?? 0

        if (errCodes.includes(errCode)) {
          return true
        }
        if (statusCodes.includes(statusCode)) {
          return true
        }

        return false
      },
      retryDelay(retryCount, err) {
        if (err.response?.status === 429) {
          const retryAfter = err.response.headers['retry-after']
          if (retryAfter) {
            return retryAfter * 1000
          }
        }
        return axiosRetry.exponentialDelay(retryCount)
      },
    })
  }

  path<Path extends keyof Endpoints>(
    path: Path,
    ...urlParameters: UrlParameters<Path>
  ) {
    let realPath: string = path
    const pathParam = urlParameters[0]
    let originPrefix = urlParameters[1]

    if (typeof pathParam === 'object') {
      keys(pathParam).forEach((paramName: PathParametersUnion<Path>) => {
        realPath = realPath.replace(
          `{${paramName}}`,
          String(pathParam[paramName]),
        )
      })
    } else {
      originPrefix = pathParam
    }

    const isRegionScoped = regionScopedPathPrefix.some((prefix) =>
      path.startsWith(prefix),
    )
    if (isRegionScoped) {
      originPrefix ??= this.region ?? Region.AMERICAS
    } else {
      originPrefix ??= this.platform ?? Platform.NA
    }

    return this.endpoints[path](
      originPrefix as GeneralRegion,
      encodeURI(realPath),
      path,
    ) as ReturnType<Endpoints[Path]>
  }
}
