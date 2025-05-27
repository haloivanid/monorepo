import { Exclude } from 'class-transformer';
import { BaseProps } from 'src/core/domain/base.props';

export class UserProps extends BaseProps {
  name: string;
  email: string;

  @Exclude()
  password: string;
}
