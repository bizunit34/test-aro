'use client';

import { notFound, useParams } from 'next/navigation';
import React from 'react';

import { ItemModel } from '@/models';
import ItemServiceInstance from '@/services/item.service';

// import PacdoraServiceInstance from '@/services/pacdora.service';
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
  //   useEffect(() => {
  //     const initializePacdora = async (): Promise<void> => {
  //       try {
  // //         await PacdoraServiceInstance.createPacdoraProject({
  // //           id: 1
  // // modelId: 100030
  // // templateId:
  // // isShowLoading:
  // // doneBtn: 'Save'
  // //         });
  //       } catch (err) {
  //         console.error(
  //           'An error occurred while trying to initialize Pacdora: ',
  //           err,
  //         );
  //       }
  //     };

  //     initializePacdora().catch((err) => console.error(err));
  //   }, []);

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
