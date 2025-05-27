import { BaseProps } from '../../domain/base.props';

export class CqrsQueryPage {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}
}

export class BaseCqrsQuery<T extends BaseProps> {
  constructor(public readonly props: T) {}
}

export class BaseCqrsQueryHandler {}
