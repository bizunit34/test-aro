import { CoreModel } from './core.model';

export interface FileModel extends CoreModel {
  link: string;
  description: string;
}
