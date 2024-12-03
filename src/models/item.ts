export interface Item {
  id: number;
  title: string;
  description?: string;
  image: string;
  price?: number;
  quantityOnHand?: number;
  quantityOnOrder?: number;
  quantityOnBackOrder?: number;
}
