import { uuid } from '../../shared/uid/uid.shared';
import { time } from '../../shared/utils/time';
import { RequestContext } from '../application/request-context';

export type DomainEventMetadata = {
  readonly timestamp: Date;
  readonly correlationId?: string;
  readonly userId?: string;
};
export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & { aggregateId: string; metadata: DomainEventMetadata };

export abstract class DomainEvent {
  public readonly id: string;
  public readonly aggregateId: string;
  public readonly metadata: DomainEventMetadata;

  protected constructor(props: DomainEventProps<unknown>) {
    this.id = uuid();
    this.aggregateId = props.aggregateId;
    this.metadata = {
      timestamp: props.metadata.timestamp ?? time().toDate(),
      correlationId: props.metadata.correlationId ?? RequestContext.getId(),
      userId: props.metadata.userId,
    };
  }
}
