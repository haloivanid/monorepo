import { DomainEntity } from './domain.entity';
import { BaseEntity } from './base.type';

export interface BaseMapper<E extends DomainEntity<any, any>, Dto extends BaseEntity<any>, RepoRecord> {
  toDomain(record: RepoRecord): E;
  toRepo(entity: E): RepoRecord;
  toDTO(entity: E, dto: new () => Dto): Dto;
}
