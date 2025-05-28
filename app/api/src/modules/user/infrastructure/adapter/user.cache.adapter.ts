import { CachePersistenceAdapter } from '../../../../infrastructure/adapter/cache-persistence.adapter';
import { UserDomainEntity } from '../../domain/user.entity';
import { Injectable } from '@nestjs/common';
import { CachePersistence } from '../../../../infrastructure/persistence/cache/cache.persistence';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserMapper } from '../../domain/user.mapper';
import { UserEntityProps } from '../../domain/user.type';

@Injectable()
export class UserCacheAdapter extends CachePersistenceAdapter<string, UserEntityProps, UserDomainEntity> {
  constructor(
    readonly cacheStore: CachePersistence,
    readonly eventEmitter: EventEmitter2,
    readonly mapper: UserMapper,
  ) {
    super(cacheStore, eventEmitter, mapper);
  }

  protected prefix: string = 'USER' as const;
}
