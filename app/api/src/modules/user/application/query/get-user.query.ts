import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserCacheAdapter } from '../../infrastructure/adapter/user.cache.adapter';
import { BaseCqrsQueryHandler } from '../../../../core/application/cqrs/base.query';

export class GetUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery>, BaseCqrsQueryHandler {
  constructor(private readonly adapter: UserCacheAdapter) {}
  async execute(query: GetUserQuery) {
    return this.adapter.findById(query.id);
  }
}
