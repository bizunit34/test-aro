'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Item } from '@/models';
import ItemService from '@/services/itemService';

import ItemDetails from '../../../components/ItemDetails';

const ItemDetailsPage: React.FC = () => {
  const router = useRouter();
  console.log('slug: ', router);
  const itemId: number | undefined = 1;
  const item: Item | undefined = ItemService.getItem(itemId);

  if (item == null) {
    throw new Error('Item not found.');
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

  console.log('window: ', window);

  return (
    <>
      <ItemDetails
        item={item}
        frequentlyPurchasedTogether={frequentlyPurchasedTogether}
      />
    </>
  );
};

export default ItemDetailsPage;