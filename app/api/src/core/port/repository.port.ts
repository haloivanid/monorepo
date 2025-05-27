import { TypeEntityID } from '../domain/domain.entity';
import { BaseProps } from '../domain/base.props';
import { DomainAggregate } from '../domain/domain.aggregate';
import { ResponsePageMetaDto } from '../application/dto/page.dto';

export abstract class RepositoryPort<B extends BaseProps, T extends TypeEntityID, E extends DomainAggregate<B, T>> {
  abstract findById(id: T): Promise<E | null>;
  abstract findByIds(ids: T[]): Promise<E[] | []>;
  abstract findByProps(props: Partial<E>, value: any): Promise<E[] | []>;
  abstract queryPage(page: number, limit: number): Promise<{ items: E[]; meta: ResponsePageMetaDto }>;
}
