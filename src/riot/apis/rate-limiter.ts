import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { RateLimiter } from 'limiter'
import PQueue from 'p-queue'

import { Platform, Region } from './enums'

export type GeneralRegion = Platform | Region

export interface LimiterConfig {
  /** Concurrency for each region */
  concurrency?: number
  debug?: boolean | 'mock'
}

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
  private readonly debug
  private readonly queue

  private lastRequestTime = Date.now()
  private i = 0

  constructor(
    private readonly generalRegion: GeneralRegion,
    private readonly axiosInstance: AxiosInstance,
    config: LimiterConfig,
  ) {
    this.debug = config.debug
    this.queue = new PQueue({ concurrency: config.concurrency ?? Infinity })
  }

  async execute<T>(
    realPath: string,
    path: string,
    query?: Record<string, any>,
  ) {
    await this.preAppRequest()
    await this.preMethodRequest(path)

    return this.queue
      .add(() => {
        if (this.debug) {
          const now = Date.now()
          // eslint-disable-next-line no-console
          console.log(
            this.generalRegion,
            realPath,
            'request',
            this.i++,
            now - this.lastRequestTime,
          )
          this.lastRequestTime = now

          // Mock request if limiter has created (that's say, the first request for each method are not mocked)
          if (this.debug === 'mock') {
            if (this.appRateLimiter && this.methodRateLimiterMap.get(path)) {
              return Promise.resolve({}) as Promise<AxiosResponse<T>>
            }
          }
        }

        const origin = `https://${this.generalRegion.toLowerCase()}.api.riotgames.com`

        return this.axiosInstance.get<T>(origin + realPath, {
          params: query,
        })
      })
      .then(async (res) => {
        await this.postAppRequest(res)
        await this.postMethodRequest(res, path)
        return res
      })
      .catch(async (err) => {
        if (axios.isAxiosError(err) && err.response) {
          await this.postAppRequest(err.response)
          await this.postMethodRequest(err.response, path)
        }

        throw err
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

  constructor(axiosInstance: AxiosInstance, config: LimiterConfig) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[...Object.values(Region), ...Object.values(Platform)].forEach(
      (generalRegion) => {
        this.regionRateLimiterMap.set(
          generalRegion,
          new RegionRateLimiter(generalRegion, axiosInstance, config),
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
