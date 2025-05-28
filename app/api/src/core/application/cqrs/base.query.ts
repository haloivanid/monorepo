import { BaseEntity, BaseEntityProps, TypeEntityId } from '../../domain/base.type';

export class CqrsQueryPage {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}

export class BaseCqrsQuery<T extends BaseEntityProps<BaseEntity<TypeEntityId>>> {
  constructor(public readonly props: T) {}
}

export class BaseCqrsQueryHandler {}
