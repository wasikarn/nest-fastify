import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import ms from 'ms'

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    const cacheKey = 'hello'

    await this.cacheManager.set(cacheKey, 'World!', ms('5s'))

    return `Hello ${await this.cacheManager.get(cacheKey)}`
  }
}
