export type TypeEntityId = string | number;

export class BaseEntity<T extends TypeEntityId> {
  id: T;
  createdAt: Date;
  updatedAt: Date;
}

export type BaseEntityProps<B extends BaseEntity<TypeEntityId>> = Omit<B, keyof BaseEntity<TypeEntityId>>;

export type BaseValueObjectProps = Record<string, any>;
