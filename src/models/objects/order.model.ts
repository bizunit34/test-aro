import { CoreModel } from './core.model';
import { OrderDetailModel } from './order-detail.model';

export interface OrderModel extends CoreModel {
  fk_order_detail__id?: number;
  fk_client__id: number;
  orderDate?: Date;
  shipByDate?: Date;
  numberOfLines: number;
  subtotal?: number;
  tax?: number;
  discount?: number;
  freight?: number;
  total?: number;
  order_detail: Array<OrderDetailModel>;
}
