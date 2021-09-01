import { URLSearchParams } from 'url'

import RiotRateLimiter from 'riot-ratelimiter'
import { STRATEGY } from 'riot-ratelimiter/dist/RateLimiter'

export class RateLimiter extends RiotRateLimiter {
  private readonly auth: string

  constructor(auth: string) {
    super({ strategy: STRATEGY.SPREAD })
    this.auth = auth
  }

  execute<T>(url: string, query?: Record<string, any>) {
    const queryParam = query ? '?' + new URLSearchParams(query) : ''
    return this.executing({
      url: url + queryParam,
      token: this.auth,
    }).then((data) => {
      return JSON.parse(data as string)
    }) as Promise<T>
  }
}
