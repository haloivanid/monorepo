import { BaseMapper } from '../../../core/domain/base.mapper';
import { UserDomainEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from './user.type';

@Injectable()
export class UserMapper implements BaseMapper<UserDomainEntity, UserEntity, Record<string, any>> {
  toRepo(entity: UserDomainEntity): Record<string, any> {
    return { id: entity.id, ...entity.getPropsValue(), createdAt: entity.createdAt, updatedAt: entity.updatedAt };
  }

  toDomain(record: Record<string, any>): UserDomainEntity {
    return new UserDomainEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: { email: record.email, name: record.name, password: record.password },
    });
  }

  toDTO(entity: UserDomainEntity, dto: typeof UserEntity): UserEntity {
    const entityProps = entity.toObject();
    return plainToInstance(dto, {
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      name: entityProps.name,
      email: entityProps.email,
      password: entityProps.password,
    });
  }
}
