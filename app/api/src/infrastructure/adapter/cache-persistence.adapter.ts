import { DomainAggregate } from '../../core/domain/domain.aggregate';
import { CachePersistence } from '../persistence/cache/cache.persistence';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseProps } from '../../core/domain/base.props';
import { TypeEntityID } from '../../core/domain/domain.entity';
import { BaseMapper } from '../../core/domain/base.mapper';
import { RepositoryPort } from '../../core/port/repository.port';
import { ResponsePageMetaDto } from '../../core/application/dto/page.dto';

export abstract class CachePersistenceAdapter<
  B extends BaseProps,
  T extends TypeEntityID,
  E extends DomainAggregate<B, T>,
> implements RepositoryPort<B, T, E>
{
  protected abstract prefix: string;

  protected constructor(
    readonly cacheStore: CachePersistence,
    readonly eventEmitter: EventEmitter2,
    readonly mapper: BaseMapper<E, any>,
  ) {}

  async findById(id: T): Promise<E | null> {
    const user = await this.cacheStore.findOneByKey<E>(String(id), this.prefix);
    return user ? this.mapper.toDomain(user) : null;
  }

  async findByIds(ids: T[]): Promise<E[]> {
    return this.cacheStore.findByKeys<E>(
      ids.map((i) => String(i)),
      this.prefix,
    );
  }

  async queryPage(page: number, size: number): Promise<{ items: E[]; meta: ResponsePageMetaDto }> {
    const results = await this.cacheStore.queryPage<E>(this.prefix, { page, size });
    return { items: results.items?.map((result: E) => this.mapper.toDomain(result)), meta: results.meta };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findByProps(props: Partial<BaseProps>, value: any): Promise<E[] | []> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<E[]> {
    const results = await this.cacheStore.find<E>(this.prefix);
    if (!results) return [];

    return results.map((result: E) => this.mapper.toDomain(result));
  }

  async remove(aggregate: E): Promise<void> {
    await this.cacheStore.removeByKey(aggregate.id.toString(), this.prefix);
    await aggregate.publishEvents(this.eventEmitter);
  }

  async insert(aggregate: E): Promise<E> {
    const result = this.cacheStore.insert<E>(aggregate.id.toString(), this.mapper.toRepo(aggregate), this.prefix);

    await aggregate.publishEvents(this.eventEmitter);
    return result;
  }

  transaction<E>(handler: (...args: any) => Promise<E>): Promise<E> {
    return Promise.resolve(handler());
  }
}
