import { CoreModel } from './core.model';

export interface ClientItemModel extends CoreModel {
  fk_client__id: number;
  fk_item__id: number;
}
