import { ItemModel } from '@/models';

const ItemService = {
  items: [
    {
      id: 1,
      title: 'Item 1',
      description: 'This is the description for item 1.',
      image:
        'https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg',
      price: 1200,
      quantityOnHand: 52,
      quantityOnOrder: 4,
      quantityOnBackOrder: 22,
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'This is the description for item 2.',
      image:
        'https://aroconnection-com-strapi-bucket.s3.us-east-1.amazonaws.com/Aro_Plastic_Bag_1_7f98176006.jpg',
      price: 1200,
      quantityOnHand: 52,
      quantityOnOrder: 4,
      quantityOnBackOrder: 22,
    },
    {
      id: 3,
      title: 'Item 3',
      description: 'This is the description for item 3.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      title: 'Item 4',
      description: 'This is the description for item 4.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      title: 'Item 5',
      description: 'This is the description for item 5.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      title: 'Item 6',
      description: 'This is the description for item 6.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      title: 'Item 7',
      description: 'This is the description for item 7.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 8,
      title: 'Item 8',
      description: 'This is the description for item 8.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 9,
      title: 'Item 9',
      description: 'This is the description for item 9.',
      image: 'https://via.placeholder.com/150',
    },
  ],
  getItems: (): Array<ItemModel> => {
    return ItemService.items;
  },

  getItem: (itemId: number | undefined): ItemModel | undefined => {
    if (itemId == null) {
      return;
    }

    return ItemService.items.find((el) => el.id === itemId);
  },
};

export default ItemService;
