import { CoreModel } from './core.model';

export interface OrderDetailFileModel extends CoreModel {
  fk_order__id: number;
  fk_order_detail__id: number;
  fk__file__id: number;
}
