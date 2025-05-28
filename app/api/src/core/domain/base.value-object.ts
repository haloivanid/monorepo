import { DomainUtil } from './domain.util';
import { BaseValueObjectProps } from './base.type';

export abstract class BaseValueObject<T extends BaseValueObjectProps> {
  protected readonly props: T;
  protected abstract validate(): void | Promise<void>;

  constructor(props: T) {
    this.props = props;
  }

  unpack(): Record<keyof T, any> {
    return DomainUtil.convertPropsToObj(this.props);
  }
}
