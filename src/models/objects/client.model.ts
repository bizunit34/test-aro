import { CoreModel } from './core.model';

export interface ClientModel extends CoreModel {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  fax?: string;
  email: string;
  fk_contact__id_primary?: number;
  fk_user__id_primary?: number;
}
