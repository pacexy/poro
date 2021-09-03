import { AxiosInstance, AxiosResponse } from 'axios'
import { RateLimiter } from 'limiter'

import { Platform, Region } from './enums'

export type GeneralRegion = Platform | Region

function parseRateLimitHeaders(str: string) {
  return str.split(',').map((rateLimit) => rateLimit.split(':').map(Number))
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class SpreadRateLimiter extends RateLimiter {
  constructor(rateLimitHeader: string) {
    // Get last rate limit
    const [tokensPerInterval, intervalInSecond] =
      parseRateLimitHeaders(rateLimitHeader).slice(-1)[0]
    super({
      tokensPerInterval: 1,
      // Minus the first request
      interval: (intervalInSecond * 1000) / (tokensPerInterval - 1),
    })
  }
}

class RegionRateLimiter {
  private readonly methodRateLimiterMap = new Map<string, RateLimiter>()
  private appRateLimiter: RateLimiter | null | undefined
  lastRequestTime = Date.now()
  i = 0

  constructor(
    private readonly generalRegion: GeneralRegion,
    private readonly axiosInstance: AxiosInstance,
  ) {}

  async execute<T>(path: string, query?: Record<string, any>) {
    // Mark the first request
    if (this.appRateLimiter === undefined) {
      this.appRateLimiter = null
    } else if (!this.appRateLimiter) {
      // Wait for the response of the first request
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await wait(100)
        if (this.appRateLimiter) break
      }
    }

    await this.appRateLimiter?.removeTokens(1)

    const now = Date.now()
    // eslint-disable-next-line no-console
    console.log('diff', this.i++, now - this.lastRequestTime)
    this.lastRequestTime = now

    if (this.appRateLimiter) return {} as AxiosResponse<T>

    const origin = `https://${this.generalRegion.toLowerCase()}.api.riotgames.com`

    return this.axiosInstance
      .get<T>(origin + path, { params: { query } })
      .then(async (res) => {
        if (this.appRateLimiter === null) {
          const appRateLimit = res.headers['x-app-rate-limit']
          this.appRateLimiter = new SpreadRateLimiter(appRateLimit)
        }

        return res
      })
  }
}

export class RiotRateLimiter {
  private readonly regionRateLimiterMap = new Map<
    GeneralRegion,
    RegionRateLimiter
  >()

  constructor(axiosInstance: AxiosInstance) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[...Object.values(Region), ...Object.values(Platform)].forEach(
      (generalRegion) => {
        this.regionRateLimiterMap.set(
          generalRegion,
          new RegionRateLimiter(generalRegion, axiosInstance),
        )
      },
    )
  }

  execute<T>(
    generalRegion: GeneralRegion,
    path: string,
    query?: Record<string, any>,
  ) {
    return this.regionRateLimiterMap.get(generalRegion)!.execute<T>(path, query)
  }
}
