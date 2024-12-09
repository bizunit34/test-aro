import { CoreModel } from './core.model';

export interface ItemModel extends CoreModel {
  name: string;
  description?: string;
  image: string;
  // initial implementation won't involve price
  // price?: number;
  quantityOnHand?: number;
  quantityOnOrder?: number;
  quantityOnBackOrder?: number;
}
