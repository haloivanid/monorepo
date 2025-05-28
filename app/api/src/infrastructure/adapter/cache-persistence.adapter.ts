import { CachePersistence } from '../persistence/cache/cache.persistence';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseMapper } from '../../core/domain/base.mapper';
import { RepositoryPort } from '../../core/port/repository.port';
import { ResponsePageMetaDto } from '../../core/application/dto/page.dto';
import { BaseEntity, BaseEntityProps, TypeEntityId } from '../../core/domain/base.type';
import { DomainAggregate } from '../../core/domain/domain.aggregate';

export abstract class CachePersistenceAdapter<
  T extends TypeEntityId,
  B extends BaseEntityProps<BaseEntity<T>>,
  A extends DomainAggregate<T, B>,
> implements RepositoryPort<T, B, A>
{
  protected abstract prefix: string;

  protected constructor(
    readonly cacheStore: CachePersistence,
    readonly eventEmitter: EventEmitter2,
    readonly mapper: BaseMapper<A, any, any>,
  ) {}

  async findById(id: T): Promise<A | null> {
    const user = await this.cacheStore.findOneByKey<A>(String(id), this.prefix);
    return user ? this.mapper.toDomain(user) : null;
  }

  async findByIds(ids: T[]): Promise<A[]> {
    return this.cacheStore.findByKeys<A>(
      ids.map((i) => String(i)),
      this.prefix,
    );
  }

  async queryPage(page: number, size: number): Promise<{ items: A[]; meta: ResponsePageMetaDto }> {
    const results = await this.cacheStore.queryPage<A>(this.prefix, { page, size });
    return { items: results.items?.map((result: A) => this.mapper.toDomain(result)), meta: results.meta };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByProps(props: Partial<A>, value: any): Promise<A[] | []> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<A[]> {
    const results = await this.cacheStore.find<A>(this.prefix);
    if (!results) return [];

    return results.map((result: A) => this.mapper.toDomain(result));
  }

  async remove(aggregate: A): Promise<void> {
    await this.cacheStore.removeByKey(aggregate.id.toString(), this.prefix);
    await aggregate.publishEvents(this.eventEmitter);
  }

  async insert(aggregate: A): Promise<A> {
    const result = this.cacheStore.insert<A>(aggregate.id.toString(), this.mapper.toRepo(aggregate), this.prefix);

    await aggregate.publishEvents(this.eventEmitter);
    return result;
  }

  transaction<E>(handler: (...args: any) => Promise<E>): Promise<E> {
    return Promise.resolve(handler());
  }
}
