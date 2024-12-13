import React from 'react';

import { OrderDetailModel } from '../models';
import styles from './CartList.module.css';

interface CartListProps {
  items: OrderDetailModel[];
  onQuantityChange: (itemId: number, newQuantity: number) => void;
}

export const CartList: React.FC<CartListProps> = ({ items, onQuantityChange }) => {
  return (
    <div className={styles.cartList}>
      {items.map((item) => (
        <div key={item._id} className={styles.cartItem}>
          <div>{item.description}</div>
          <div>Backordered: {item.quantityBackordered}</div>
          <div>Shipped: {item.quantityShipped}</div>
          <div>
            Quantity:
            <input
              type='number'
              value={item.quantityOrdered}
              min={1}
              onChange={(e) => onQuantityChange(item._id, parseInt(e.target.value, 10))}
              className={styles.quantityInput}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
