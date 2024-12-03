import React from 'react';
import ItemDetails from '../../../components/ItemDetails';
import { Item } from '@/models';
import ItemService from '@/services/itemService';

const ItemDetailsPage: React.FC<{itemId: number}> = async ({itemId}) => {
  const item: Item | undefined = await ItemService.getItem(itemId);

  if (item == null) {
    throw new Error('Item not found.')
  }

  const frequentlyPurchasedTogether = [
    {
      id: 101,
      title: 'Gaming Mouse',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: 102,
      title: 'Gaming Headset',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: 103,
      title: 'Laptop Cooling Pad',
      image: 'https://via.placeholder.com/100x100',
    },
  ];

  return (
    <ItemDetails
      item={item}
      frequentlyPurchasedTogether={frequentlyPurchasedTogether}
    />
  );
};

export default ItemDetailsPage;
