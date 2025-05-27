import { DynamicModule, Provider, Type } from '@nestjs/common';
import { Routes } from '@nestjs/core';

export interface AbstractModule {
  routes: Routes;

  imports: Array<Type | DynamicModule>;

  commandHandlers: Array<Provider>;
  queryHandlers: Array<Provider>;
  controllers: Array<Type>;

  eventHandlers: Array<Provider>;

  mappers: Array<Provider>;
  repositoryAdapters: Array<Provider>;

  register(): DynamicModule;
}
