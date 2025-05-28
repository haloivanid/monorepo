import { DomainEntity } from './domain.entity';
import { BaseValueObject } from './base.value-object';
import { BaseEntity, BaseEntityProps, BaseValueObjectProps } from './base.type';

export class DomainUtil {
  private static toPlainObject(value: any) {
    if (this.isEntity(value)) return value.toObject();
    if (this.isValueObject(value)) return value.unpack();
    return value;
  }

  static isEntity(entity: unknown): entity is DomainEntity<any, any> {
    return entity instanceof DomainEntity;
  }

  static isValueObject(valueObject: any): valueObject is BaseValueObject<any> {
    return valueObject instanceof BaseValueObject;
  }

  static convertPropsToObj<T extends BaseEntityProps<BaseEntity<any>> | BaseValueObjectProps>(
    props: T,
  ): Record<keyof T, any> {
    if (props == null) return props as Record<keyof T, any>;
    const propsValue = structuredClone(props);

    for (const key in propsValue) {
      if (propsValue[key] == null) continue;
      if (Array.isArray(propsValue[key])) {
        propsValue[key as any] = propsValue[key].map((row) => this.toPlainObject(row));
      } else {
        propsValue[key] = this.toPlainObject(propsValue[key]);
      }
    }

    return propsValue as Record<keyof T, any>;
  }
}
