import React from 'react';
import ItemDetails from '../../../components/ItemDetails';
import { Item } from '@/models';

const ItemDetailsPage: React.FC = () => {
  const item: Item = {
    id: 1,
    title: 'Gaming Laptop',
    description: 'High-performance laptop for gaming and productivity.',
    image: 'https://via.placeholder.com/600x300',
    price: 1200,
    quantityOnHand: 52,
    quantityOnOrder: 4,
    quantityOnBackOrder: 22,
  };

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
