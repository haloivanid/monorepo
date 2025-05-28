import { time } from '../../shared/utils/time';
import { Logger } from '@nestjs/common';
import { BaseEntity, BaseEntityProps, TypeEntityId } from './base.type';
import { DomainUtil } from './domain.util';

export interface CreateDomainEntityProps<T extends TypeEntityId, B extends BaseEntityProps<BaseEntity<T>>>
  extends Partial<BaseEntity<T>> {
  id: T;
  props: B;
}

export abstract class DomainEntity<T extends TypeEntityId, B extends BaseEntityProps<BaseEntity<T>>> {
  public logger = new Logger(this.constructor.name);

  protected abstract _id: T;
  protected readonly props: B;
  protected readonly _createdAt: Date;
  protected readonly _updatedAt: Date;

  constructor(createEntityProps: CreateDomainEntityProps<T, B>) {
    const now = time().toDate();

    this.props = createEntityProps.props;
    this._createdAt = createEntityProps.createdAt ?? now;
    this._updatedAt = createEntityProps.updatedAt ?? now;

    this.setId(createEntityProps.id);
  }

  public abstract validate(): void | Promise<void>;

  get id(): T {
    return this._id;
  }

  private setId(id: T) {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  getPropsValue(): B {
    return Object.freeze({ ...this.props });
  }

  toObject(): Record<keyof B, any> {
    return Object.freeze({
      id: this.id,
      ...DomainUtil.convertPropsToObj<B>(this.props),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}
