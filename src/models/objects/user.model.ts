import { CoreModel } from './core.model';

export interface UserModel extends CoreModel {
  firstName: string;
  lastName: string;
  email: string;
}
