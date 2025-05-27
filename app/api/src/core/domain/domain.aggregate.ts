import { DomainEntity } from './domain.entity';
import { RequestContext } from '../application/request-context';
import { DomainEvent } from './domain.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseProps } from './base.props';

export abstract class DomainAggregate<Props extends BaseProps, TypeID> extends DomainEntity<Props, TypeID> {
  private readonly ctx = RequestContext;
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(event: DomainEvent) {
    this._domainEvents.push(event);
  }

  clearEvents() {
    this._domainEvents = [];
  }

  async publishEvents(eventEmitter: EventEmitter2) {
    const execute = (event: any) => {
      const payload = {
        requestId: this.ctx.getId(),
        event: event.constructor.name,
        aggregate: this.constructor.name,
        aggregateId: this.id,
      };

      this.logger.debug(JSON.stringify(payload));
      return eventEmitter.emit(event.constructor.name, event);
    };

    await Promise.all(this.domainEvents.map(execute));
    this.clearEvents();
  }
}
