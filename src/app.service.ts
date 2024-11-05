import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    const cacheKey = 'hello'

    await this.cacheManager.set(cacheKey, 'World!', 60000)

    return `Hello ${await this.cacheManager.get(cacheKey)}`
  }
}
