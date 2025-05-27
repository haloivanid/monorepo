import { Logger } from '@nestjs/common';

export abstract class PresenterAbstract {
  logger: Logger = new Logger(this.constructor.name);

  abstract init(): Promise<void>;
  abstract initForE2ETest(): Promise<void>;
}
