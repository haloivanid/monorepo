import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/user.entity';
import { UserCacheAdapter } from '../../infrastructure/adapter/user.cache.adapter';
import {
  BaseCqrsCommand,
  BaseCqrsCommandHandler,
  CqrsCommandProps,
} from '../../../../core/application/cqrs/base.command';

export class CreateUserCommand extends BaseCqrsCommand {
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(props: CqrsCommandProps<CreateUserCommand>) {
    super(props);

    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCqrsCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserCacheAdapter) {
    super();
  }

  async execute(command: CreateUserCommand): Promise<void> {
    this.logger.log(`received command: ${command.constructor.name} - ${JSON.stringify(command)}`);

    const user = UserEntity.create({ name: command.name, email: command.email, password: command.password });

    await this.repository.transaction(() => this.repository.insert(user));

    return Promise.resolve();
  }
}
