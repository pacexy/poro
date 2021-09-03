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
      interval: (intervalInSecond * 1000) / tokensPerInterval,
    })
  }
}

type RateLimiterProperty = RateLimiter | null | undefined

class RegionRateLimiter {
  private readonly methodRateLimiterMap = new Map<string, RateLimiterProperty>()
  private appRateLimiter: RateLimiterProperty
  private lastRequestTime = Date.now()
  private i = 0

  constructor(
    private readonly generalRegion: GeneralRegion,
    private readonly axiosInstance: AxiosInstance,
  ) {}

  async execute<T>(
    realPath: string,
    path: string,
    query?: Record<string, any>,
  ) {
    await this.preAppRequest()
    await this.preMethodRequest(path)

    // debug
    // eslint-disable-next-line no-constant-condition
    if (false) {
      const now = Date.now()
      // eslint-disable-next-line no-console
      console.log(
        this.generalRegion,
        path,
        'request',
        this.i++,
        now - this.lastRequestTime,
      )
      this.lastRequestTime = now

      // mock request if limiter has created
      if (this.appRateLimiter && this.methodRateLimiterMap.get(path)) {
        return {} as AxiosResponse<T>
      }
    }

    const origin = `https://${this.generalRegion.toLowerCase()}.api.riotgames.com`

    return this.axiosInstance
      .get<T>(origin + realPath, { params: { query } })
      .then(async (res) => {
        await this.postAppRequest(res)
        await this.postMethodRequest(res, path)
        return res
      })
  }

  async preAppRequest() {
    // Mark the first app request
    if (this.appRateLimiter === undefined) {
      this.appRateLimiter = null
    } else if (!this.appRateLimiter) {
      // Wait for the response of the first app request
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await wait(100)
        if (this.appRateLimiter) break
      }
    }

    await this.appRateLimiter?.removeTokens(1)
  }

  async postAppRequest(res: AxiosResponse) {
    if (this.appRateLimiter === null) {
      const appRateLimit = res.headers['x-app-rate-limit']
      this.appRateLimiter = new SpreadRateLimiter(appRateLimit)
      await this.appRateLimiter.removeTokens(1)
    }
  }

  async preMethodRequest(path: string) {
    // Mark the first method request
    if (this.methodRateLimiterMap.get(path) === undefined) {
      this.methodRateLimiterMap.set(path, null)
    } else if (!this.methodRateLimiterMap.get(path)) {
      // Wait for the response of the first method request
      // eslint-disable-next-line no-constant-condition
      while (true) {
        await wait(100)
        if (this.methodRateLimiterMap.get(path)) break
      }
    }

    await this.methodRateLimiterMap.get(path)?.removeTokens(1)
  }

  async postMethodRequest(res: AxiosResponse, path: string) {
    if (this.methodRateLimiterMap.get(path) === null) {
      const methodRateLimit = res.headers['x-method-rate-limit']
      const methodRateLimiter = new SpreadRateLimiter(methodRateLimit)
      this.methodRateLimiterMap.set(path, methodRateLimiter)
      await methodRateLimiter.removeTokens(1)
    }
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
    realPath: string,
    path: string,
    query?: Record<string, any>,
  ) {
    return this.regionRateLimiterMap
      .get(generalRegion)!
      .execute<T>(realPath, path, query)
  }
}
