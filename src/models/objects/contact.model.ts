import { CoreModel } from './core.model';

export interface ContactModel extends CoreModel {
  firstName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  role: string;
}
