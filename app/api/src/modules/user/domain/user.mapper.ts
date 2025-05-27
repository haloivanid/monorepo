import { BaseMapper } from '../../../core/domain/base.mapper';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements BaseMapper<UserEntity, Record<string, any>> {
  toRepo(entity: UserEntity): Record<string, any> {
    return { id: entity.id, ...entity.getPropsValue(), createdAt: entity.createdAt, updatedAt: entity.updatedAt };
  }

  toDomain(record: Record<string, any>): UserEntity {
    return new UserEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: { email: record.email, name: record.name, password: record.password },
    });
  }
}
