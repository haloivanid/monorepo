import { Module } from '@nestjs/common';
import { UserModule } from '../../../modules/user/user.module';
import { RequestContextModule } from 'nestjs-request-context';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({ imports: [RequestContextModule, EventEmitterModule.forRoot(), UserModule] })
export class RestModule {}
