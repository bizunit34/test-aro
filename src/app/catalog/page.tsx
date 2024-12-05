import React from 'react';

import { Item } from '@/models';
import ItemService from '@/services/itemService';

import CatalogList from '../../components/CatalogList';

export default function Catalog(): React.JSX.Element {
  const items: Array<Item> = ItemService.getItems();

  return <CatalogList items={items} itemsPerPage={6} />;
}
