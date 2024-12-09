import { CoreModel } from './core.model';

export interface ItemModel extends CoreModel {
  name: string;
  description?: string;
  image: string;
  price?: number;
  quantityOnHand?: number;
  quantityOnOrder?: number;
  quantityOnBackOrder?: number;
}
