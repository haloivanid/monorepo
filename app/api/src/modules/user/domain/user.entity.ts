import { DomainAggregate } from '../../../core/domain/domain.aggregate';
import { uuid } from '../../../shared/uid/uid.shared';
import { encryptSalt } from '../../../shared/crypt/crypt.shared';
import { CreateUserEvent } from './event/create-user.event';
import { UserEntityProps } from './user.type';

export class UserDomainEntity extends DomainAggregate<string, UserEntityProps> {
  declare protected _id: string;

  static create(props: UserEntityProps) {
    const id = uuid();
    props.password = encryptSalt(props.password);

    const user = new UserDomainEntity({ id, props });

    user.addEvent(new CreateUserEvent({ aggregateId: id, metadata: { timestamp: new Date() }, ...props }));

    return user;
  }

  validate(): void | Promise<void> {
    return undefined;
  }
}
