import { OrderStatusEnum, OrderTypeEnum } from '@/enum';

import { CoreModel } from './core.model';
import { OrderDetailModel } from './order-detail.model';

export interface OrderModel extends CoreModel {
  fk_order_detail__id?: number;
  fk_client__id: number;
  fk_user__id: number;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
  orderDate?: Date;
  shipByDate?: Date;
  numberOfLines: number;
  order_detail: Array<OrderDetailModel>;
}
