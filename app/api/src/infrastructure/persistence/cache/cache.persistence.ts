import { DynamicModule, Injectable, Logger, Module } from '@nestjs/common';
import { PageParamDto, ResponsePageMetaDto } from '../../../core/application/dto/page.dto';

export interface CachePersistenceStore {
  insert<T = any>(key: string, value: T, prefix: string): Promise<void>;
  findOneByKey<T = any>(key: string, prefix: string): Promise<T | null>;
  findByKeys<T = any>(keys: string[], prefix: string): Promise<Array<T> | []>;
  find<T = any>(prefix: string): Promise<Array<T> | []>;
  removeByKey(key: string, prefix: string): Promise<void>;
  getKeys(prefix: string): Promise<Array<string>>;
  exist(key: string, prefix: string): Promise<boolean>;
  queryPage<T = any>(
    prefix: string,
    params: PageParamDto,
    preDataKeys?: Array<string>,
  ): Promise<{ items: Array<T>; meta: ResponsePageMetaDto }>;
}

class CacheMemoryStore implements CachePersistenceStore {
  private store: Map<string, any> = new Map();

  getKeys(prefix: string): Promise<Array<string>> {
    const allStoreKeys = Array.from(this.store.keys()).filter((key) => key.startsWith(prefix));
    return Promise.resolve(allStoreKeys.map((key) => key.split(':')[1]));
  }

  insert<T = any>(key: string, value: T, prefix: string): Promise<void> {
    key = prefix ? `${prefix}:${key}` : key;
    this.store.set(key, value);
    return Promise.resolve();
  }

  findOneByKey<T = any>(key: string, prefix: string): Promise<T | null> {
    key = prefix ? `${prefix}:${key}` : key;
    return Promise.resolve(this.store.get(key) as T | null);
  }

  findByKeys<T = any>(keys: string[], prefix: string): Promise<Array<T> | []> {
    keys = keys.map((key) => (prefix ? `${prefix}:${key}` : key));
    return Promise.resolve(keys.map((key) => this.store.get(key) as T).filter(Boolean));
  }

  async find<T = any>(prefix: string): Promise<Array<T> | []> {
    const keys = await this.getKeys(prefix);
    return this.findByKeys(keys, prefix);
  }

  removeByKey(key: string, prefix: string): Promise<void> {
    key = prefix ? `${prefix}:${key}` : key;
    this.store.delete(key);
    return Promise.resolve();
  }

  exist(key: string, prefix: string): Promise<boolean> {
    key = `${prefix}:${key}`;
    return Promise.resolve(this.store.has(key));
  }

  async queryPage<T = any>(
    prefix: string,
    params: PageParamDto,
    preDataKeys?: Array<string>,
  ): Promise<{ items: Array<T>; meta: ResponsePageMetaDto }> {
    if (params.size < 10 || params.size > 100) params.size = 10;

    const keys = preDataKeys ?? (await this.getKeys(prefix));

    const totalItem = keys.length;
    const totalPage = Math.ceil(totalItem / params.size);
    const pageStart = (params.page - 1) * params.size;
    const pageEnd = pageStart + params.size;
    const items = await this.findByKeys<T>(keys.slice(pageStart, pageEnd), prefix);
    return { items, meta: { size: params.size, page: params.page, totalPage, totalItem } };
  }
}

@Module({})
export class CachePersistenceModule {}

@Injectable()
export class CachePersistence {
  private static _instance: CachePersistence;

  private logger = new Logger(this.constructor.name);
  private store: CachePersistenceStore = new CacheMemoryStore();

  private constructor() {}

  static getInstance() {
    return this._instance || (this._instance = new this());
  }

  static register(): DynamicModule {
    return {
      module: CachePersistenceModule,
      providers: [{ provide: CachePersistence, useValue: CachePersistence.getInstance() }],
      exports: [CachePersistence],
    };
  }

  async insert<T = any>(key: string, value: T, prefix: string): Promise<T> {
    await this.store.insert(key, value, prefix);
    return value;
  }

  findByKeys<T = any>(keys: string[], prefix: string): Promise<Array<T> | []> {
    return this.store.findByKeys(keys, prefix);
  }

  findOneByKey<T = any>(key: string, prefix: string): Promise<T | null> {
    return this.store.findOneByKey(key, prefix);
  }

  find<T = any>(prefix: string): Promise<Array<T> | []> {
    return this.store.find(prefix);
  }

  removeByKey(key: string, prefix: string): Promise<void> {
    return this.store.removeByKey(key, prefix);
  }

  getKeys(prefix: string): Promise<Array<string>> {
    return this.store.getKeys(prefix);
  }

  exist(key: string, prefix: string): Promise<boolean> {
    return this.store.exist(key, prefix);
  }

  queryPage<T = any>(
    prefix: string,
    params: PageParamDto,
    preDataKeys?: Array<string>,
  ): Promise<{ items: Array<T>; meta: ResponsePageMetaDto }> {
    return this.store.queryPage(prefix, params, preDataKeys);
  }
}
