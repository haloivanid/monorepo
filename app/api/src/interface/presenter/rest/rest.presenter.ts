import { PresenterAbstract } from '../presenter.abstract';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RawRequestDefaultExpression } from 'fastify';
import { uuid } from '../../../shared/uid/uid.shared';
import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';

export class RestPresenter extends PresenterAbstract {
  httpAdapter() {
    return new FastifyAdapter({
      trustProxy: true,
      genReqId: (req: RawRequestDefaultExpression) => {
        return ((req.headers as Record<string, never>)['x-request-id'] as string) ?? uuid();
      },
      logger: {
        stream: { write: (msg) => this.logger.debug(msg.trim()) },
        serializers: {
          req: (req: any) => ({ method: req.method, url: req.url, headers: req.headers, remoteAddress: req.ip }),
        },
      },
    });
  }

  async init(): Promise<void> {
    const app = await NestFactory.create<NestFastifyApplication>(RestModule, this.httpAdapter());

    app.enableCors({ origin: '*' });

    await app.listen({ host: '0.0.0.0', port: 3000 });
  }

  initForE2ETest(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
