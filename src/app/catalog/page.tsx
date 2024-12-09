import React from 'react';

import { ItemModel } from '@/models';
import ItemService from '@/services/item.service';

import CatalogList from '../../components/CatalogList';

export default function Catalog(): React.JSX.Element {
  const items: Array<ItemModel> = ItemService.getItems();

  return <CatalogList items={items} itemsPerPage={6} />;
}
