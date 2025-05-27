import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/command/create-user.command';

@Controller()
export class CreateUserRestController {
  constructor(private readonly cqrsCommand: CommandBus) {}
  @Post()
  async create(@Body() body: Record<string, any>) {
    const command = new CreateUserCommand({ name: body.name, email: body.email, password: body.password });
    await this.cqrsCommand.execute(command);
  }
}
