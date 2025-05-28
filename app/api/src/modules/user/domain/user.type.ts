import { BaseEntity, BaseEntityProps } from '../../../core/domain/base.type';
import { Exclude } from 'class-transformer';

type TypeUserId = string;

export class UserEntity extends BaseEntity<TypeUserId> {
  name: string;
  email: string;

  @Exclude()
  password: string;
}

export type UserEntityProps = BaseEntityProps<UserEntity>;
