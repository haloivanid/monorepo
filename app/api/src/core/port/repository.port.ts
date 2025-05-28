import { ResponsePageMetaDto } from '../application/dto/page.dto';
import { BaseEntity, BaseEntityProps, TypeEntityId } from '../domain/base.type';
import { DomainAggregate } from '../domain/domain.aggregate';

export abstract class RepositoryPort<
  T extends TypeEntityId,
  B extends BaseEntityProps<BaseEntity<T>>,
  A extends DomainAggregate<T, B>,
> {
  abstract findById(id: T): Promise<A | null>;
  abstract findByIds(ids: T[]): Promise<A[] | []>;
  abstract findByProps(props: Partial<A>, value: any): Promise<A[] | []>;
  abstract queryPage(page: number, limit: number): Promise<{ items: A[]; meta: ResponsePageMetaDto }>;
}
