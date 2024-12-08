'use client';

import { notFound, useParams } from 'next/navigation';
import React from 'react';

import { ItemModel } from '@/models';
import ItemServiceInstance from '@/services/item.service';

import ItemDetails from '../../../components/ItemDetails';

const ItemDetailsPage: React.FC = () => {
  const params = useParams();

  if (params?.id == null) {
    notFound();
  }

  const item: ItemModel | undefined = ItemServiceInstance.getItem(+params.id);

  if (item == null) {
    notFound();
  }

  // const pacdoraService: PacdoraService = PacdoraService.createPacdoraService();

  // pacdoraService.initializePacdora();

  const frequentlyPurchasedTogether = [
    {
      _id: 101,
      name: 'Gaming Mouse',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      _id: 102,
      name: 'Gaming Headset',
      image: 'https://via.placeholder.com/100x100',
    },
    {
      _id: 103,
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
