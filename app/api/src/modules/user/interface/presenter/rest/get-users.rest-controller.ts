import { Controller, Get, Query } from '@nestjs/common';
import { GetUsersQuery } from '../../../application/query/get-users.query';
import { QueryBus } from '@nestjs/cqrs';

@Controller()
export class GetUsersRestController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  index(@Query('size') size: number, @Query('page') page: number) {
    if (size === undefined || page === undefined) throw new Error('size and page are required');
    if (size < 1 || page < 1) throw new Error('size and page must be greater than 0');
    if (size > 100) throw new Error('size must be less than 100');
    const query = new GetUsersQuery({ size, page });
    return this.queryBus.execute(query);
  }
}
