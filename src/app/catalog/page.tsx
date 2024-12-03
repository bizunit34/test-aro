import { Item } from '@/models';
import CatalogList from '../../components/CatalogList';
import ItemService from '@/services/itemService';

export default async function Catalog() {
  const items: Array<Item> = await ItemService.getItems();

  return <CatalogList items={items} itemsPerPage={6} />;
}
