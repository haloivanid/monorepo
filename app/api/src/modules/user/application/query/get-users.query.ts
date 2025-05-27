import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserCacheAdapter } from '../../infrastructure/adapter/user.cache.adapter';
import { BaseCqrsQueryHandler } from '../../../../core/application/cqrs/base.query';
import { PageParamDto } from '../../../../core/application/dto/page.dto';

export class GetUsersQuery {
  constructor(public readonly query: PageParamDto) {}
}

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery>, BaseCqrsQueryHandler {
  constructor(private readonly adapter: UserCacheAdapter) {}
  async execute(query: GetUsersQuery) {
    return this.adapter.queryPage(query.query.page, query.query.size);
  }
}
