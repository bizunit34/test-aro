'use client';

import { notFound, useParams } from 'next/navigation';
import React from 'react';

import { Item } from '@/models';
import ItemService from '@/services/itemService';
import PacdoraService from '@/services/pacdoraService';

import ItemDetails from '../../../components/ItemDetails';

const ItemDetailsPage: React.FC = () => {
  const params = useParams();

  if (params?.id == null) {
    notFound();
  }

  const item: Item | undefined = ItemService.getItem(+params.id);

  if (item == null) {
    notFound();
  }

  const pacdoraService: PacdoraService = PacdoraService.createPacdoraService();

  pacdoraService.initializePacdora();

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
