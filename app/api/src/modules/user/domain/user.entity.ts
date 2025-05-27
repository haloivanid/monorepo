import { DomainAggregate } from '../../../core/domain/domain.aggregate';
import { UserProps } from './user.props';
import { uuid } from '../../../shared/uid/uid.shared';
import { encryptSalt } from '../../../shared/crypt/crypt.shared';
import { CreateUserEvent } from './event/create-user.event';

export class UserEntity extends DomainAggregate<UserProps, string> {
  declare protected _id: string;

  static create(props: UserProps) {
    const id = uuid();
    props.password = encryptSalt(props.password);

    const user = new UserEntity({ id, props });

    user.addEvent(new CreateUserEvent({ aggregateId: id, metadata: { timestamp: new Date() }, ...props }));

    return user;
  }

  validate(): void | Promise<void> {
    return undefined;
  }
}
