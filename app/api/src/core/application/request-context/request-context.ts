import { InstanceRequestContext } from './instance.request-context';

export class RequestContext {
  static getContext() {
    return InstanceRequestContext.currentContext.req;
  }

  static getId() {
    const ctx = this.getContext();
    return ctx.id;
  }

  static getUserId() {
    const ctx = this.getContext();
    return ctx.user?.id ?? null;
  }
}
