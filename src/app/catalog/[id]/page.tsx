'use client';

import { notFound, useParams } from 'next/navigation';
import React from 'react';

import { ItemModel } from '@/models';
import ItemService from '@/services/item.service';
import PacdoraService from '@/services/pacdora.service.ts';

import ItemDetails from '../../../components/ItemDetails';

const ItemDetailsPage: React.FC = () => {
  const params = useParams();

  if (params?.id == null) {
    notFound();
  }

  const item: ItemModel | undefined = ItemService.getItem(+params.id);

  if (item == null) {
    notFound();
  }

  const pacdoraService: PacdoraService = PacdoraService.createPacdoraService();

  pacdoraService.initializePacdora();

  const frequentlyPurchasedTogether = [
    {
      id: 101,
      name: 'Gaming Mouse',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: 102,
      name: 'Gaming Headset',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      id: 103,
      name: 'Laptop Cooling Pad',
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
