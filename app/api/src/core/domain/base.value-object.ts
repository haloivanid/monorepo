export type Primitives = string | number | boolean;
export interface DomainPrimitive<T extends Primitives | Date> {
  value: T;
}
type ValueObjectProps<T> = T extends Primitives | Date ? DomainPrimitive<T> : T;

export abstract class BaseValueObject<T> {
  protected readonly props: ValueObjectProps<T>;
  protected abstract validate(): void | Promise<void>;

  constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  static isValueObject(valueObject: unknown): valueObject is BaseValueObject<unknown> {
    return valueObject instanceof BaseValueObject;
  }

  private isDomainPrimitive(obj: unknown): obj is DomainPrimitive<T & (Primitives | Date)> {
    return !!Object.prototype.hasOwnProperty.call(obj, 'value');
  }
}
