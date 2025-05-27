import { DomainEvent, DomainEventProps } from '../../../../core/domain/domain.event';

export class CreateUserEvent extends DomainEvent {
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(props: DomainEventProps<CreateUserEvent>) {
    super(props);
  }
}
