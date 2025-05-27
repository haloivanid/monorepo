import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GetUsersRestController } from './interface/presenter/rest/get-users.rest-controller';
import { CreateUserRestController } from './interface/presenter/rest/create-user.rest-controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './application/command/create-user.command';
import { CachePersistence } from '../../infrastructure/persistence/cache/cache.persistence';
import { UserCacheAdapter } from './infrastructure/adapter/user.cache.adapter';
import { UserMapper } from './domain/user.mapper';
import { RouterModule } from '@nestjs/core';
import { AbstractModule } from '../abstract.module';
import { GetUserQueryHandler } from './application/query/get-user.query';
import { GetUserRestController } from './interface/presenter/rest/get-user.rest-controller';

@Module({ imports: [new UserModule().register()] })
export class UserModule implements AbstractModule {
  routes = [{ path: '/users', module: UserModule }];

  imports = [CqrsModule, CachePersistence.register(), RouterModule.register(this.routes)];

  commandHandlers = [CreateUserCommandHandler];
  queryHandlers = [GetUserQueryHandler];
  controllers = [CreateUserRestController, GetUsersRestController, GetUserRestController];
  eventHandlers = [];

  mappers: Provider[] = [UserMapper];
  repositoryAdapters: Provider[] = [{ provide: UserCacheAdapter, useClass: UserCacheAdapter }];

  register(): DynamicModule {
    return {
      module: UserModule,
      imports: [...this.imports],
      controllers: [...this.controllers],
      providers: [...this.commandHandlers, ...this.queryHandlers, ...this.mappers, ...this.repositoryAdapters],
      exports: [],
    };
  }
}
