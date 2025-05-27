import { RequestContext } from 'nestjs-request-context';

export class InstanceRequestContext extends RequestContext {
  requestId: string;
}
