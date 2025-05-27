import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserQuery } from '../../../application/query/get-user.query';

@Controller('/:id')
export class GetUserRestController {
  constructor(private readonly cqrsQuery: QueryBus) {}

  @Get()
  index(@Param('id') id: string) {
    return this.cqrsQuery.execute(new GetUserQuery(id));
  }
}
