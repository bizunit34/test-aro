import { ItemModel } from '@/models';

class ItemService {
  private static items: Array<ItemModel> = [
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
