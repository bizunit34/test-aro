import { CoreModel } from './core.model';

export interface OrderDetailModel extends CoreModel {
  fk_item__id: number;
  description: string;
  quantityOrdered: number;
  quantityBackordered: number;
  quantityShipped: number;
  // initial implementation doesn't plan to involve price
  // price: number;
}
