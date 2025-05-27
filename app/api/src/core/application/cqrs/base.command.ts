import { uuid } from '../../../shared/uid/uid.shared';
import { time } from '../../../shared/utils/time';
import { RequestContext } from '../request-context';
import { Logger } from '@nestjs/common';

export type CqrsCommandMetadata = {
  readonly timestamp: Date;
  readonly correlationId?: string;
  readonly userId?: string;
};
export type CqrsCommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<BaseCqrsCommand>;

export class BaseCqrsCommand {
  readonly id: string;
  readonly metadata: CqrsCommandMetadata;

  protected constructor(props: CqrsCommandProps<unknown>) {
    this.id = props.id ?? uuid();
    this.metadata = {
      timestamp: props.metadata?.timestamp ?? time().toDate(),
      correlationId: props.metadata?.correlationId ?? RequestContext.getId(),
      userId: props.metadata?.userId ?? RequestContext.getUserId() ?? undefined,
    };
  }
}

export class BaseCqrsCommandHandler {
  protected readonly logger = new Logger(this.constructor.name);
}
