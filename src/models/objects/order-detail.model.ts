import { CoreModel } from './core.model';

export interface OrderDetailModel extends CoreModel {
  fk_item__id: number;
  description: string;
  quantityOrdered: number;
  quantityBackordered: number;
  quantityShipped: number;
  price: number;
}
