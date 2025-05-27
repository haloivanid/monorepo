import { time } from '../../shared/utils/time';
import { BaseProps } from './base.props';
import { Logger } from '@nestjs/common';

// export infra DomainEntityProps {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export type TypeEntityID = string | number;

export interface CreateDomainEntityProps<Props extends BaseProps, ID = TypeEntityID> {
  id: ID;
  props: Props;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class DomainEntity<Props extends BaseProps, TypeID = TypeEntityID> {
  public logger = new Logger(this.constructor.name);

  protected abstract _id: TypeID;
  protected readonly props: Props;
  protected readonly _createdAt: Date;
  protected readonly _updatedAt: Date;

  constructor(createEntityProps: CreateDomainEntityProps<Props, TypeID>) {
    const now = time().toDate();

    this.props = createEntityProps.props;
    this._createdAt = createEntityProps.createdAt ?? now;
    this._updatedAt = createEntityProps.updatedAt ?? now;

    this.setId(createEntityProps.id);
  }

  public abstract validate(): void | Promise<void>;

  static isEntity(entity: unknown): entity is DomainEntity<BaseProps, string | number> {
    return entity instanceof DomainEntity;
  }

  get id(): TypeID {
    return this._id;
  }

  private setId(id: TypeID) {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  getPropsValue(): Props {
    return Object.freeze({ ...this.props });
  }
}
