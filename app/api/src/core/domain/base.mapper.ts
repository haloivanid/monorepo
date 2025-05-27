import { DomainEntity } from './domain.entity';
import { BaseProps } from './base.props';

export interface BaseMapper<E extends DomainEntity<BaseProps>, RepoRecord> {
  toDomain(record: RepoRecord): E;
  toRepo(entity: E): RepoRecord;
}
