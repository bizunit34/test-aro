import { ItemModel } from '@/models';

class ItemService {
  private static items: Array<ItemModel> = [
    {
      _id: 3333,
      name: 'Custom dimensions double tray boxes storage with front opening dieline 100103',
      description:
        'Double tray boxes storage with front opening cardboard mailer mockup',
      image:
        '//cdn.pacdora.com/image-resize/500xauto_outside/preview/100103-white-board-71.jpg',
      modelId: '100103',
      quantityOnHand: 500,
      quantityOnOrder: 20,
      quantityOnBackOrder: 0,
    },
    {
      _id: 3334,
      name: 'Custom dimensions inserts tuck end box inserts dieline 310030',
      description: 'Inserts tuck end box inserts square inserts mockup',
      image:
        '//cdn.pacdora.com/image-resize/500xauto_outside/preview/160010-flute-31.jpg',
      modelId: '310030',
      quantityOnHand: 1000,
      quantityOnOrder: 40,
      quantityOnBackOrder: 0,
    },
    {
      _id: 1,
      name: 'Item 1',
      description: 'This is the description for item 1.',
      image:
        'https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg',
      // price: 1200,
      quantityOnHand: 52,
      quantityOnOrder: 4,
      quantityOnBackOrder: 22,
    },
    {
      _id: 2,
      name: 'Item 2',
      description: 'This is the description for item 2.',
      image:
        'https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg',
      // price: 1200,
      quantityOnHand: 52,
      quantityOnOrder: 4,
      quantityOnBackOrder: 22,
    },
    {
      _id: 3,
      name: 'Item 3',
      description: 'This is the description for item 3.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 4,
      name: 'Item 4',
      description: 'This is the description for item 4.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 5,
      name: 'Item 5',
      description: 'This is the description for item 5.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 6,
      name: 'Item 6',
      description: 'This is the description for item 6.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 7,
      name: 'Item 7',
      description: 'This is the description for item 7.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 8,
      name: 'Item 8',
      description: 'This is the description for item 8.',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: 9,
      name: 'Item 9',
      description: 'This is the description for item 9.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  public getItems(): Array<ItemModel> {
    return ItemService.items;
  }

  public getItem(itemId: number | undefined): ItemModel | undefined {
    if (itemId == null) {
      return;
    }

    return ItemService.items.find((el) => el._id === itemId);
  }
}

const ItemServiceInstance: ItemService = new ItemService();

export default ItemServiceInstance;
