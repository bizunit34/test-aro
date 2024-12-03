import React from 'react';
import ItemDetails from '../../../components/ItemDetails';

const ItemDetailsPage: React.FC = () => {
    const item = {
        id: 1,
        title: 'Gaming Laptop',
        description: 'High-performance laptop for gaming and productivity.',
        image: 'https://via.placeholder.com/600x300',
        details: {
          Price: '$1200',
          Brand: 'XYZ',
          Processor: 'Intel i7',
          RAM: '16GB',
          Storage: '512GB SSD',
        },
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
      
  return <ItemDetails item={item} frequentlyPurchasedTogether={frequentlyPurchasedTogether} />;
};

export default ItemDetailsPage;
