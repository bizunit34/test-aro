import React from 'react';

import { OrderStatusEnum, OrderTypeEnum } from '../enum';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  clientId: number;
  userId: number;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
  orderDate?: Date;
  shipByDate?: Date;
  numberOfLines: number;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  clientId,
  userId,
  type,
  status,
  orderDate,
  shipByDate,
  numberOfLines,
}) => {
  return (
    <div className={styles.cartSummary}>
      <div>Client ID: {clientId}</div>
      <div>User ID: {userId}</div>
      <div>Type: {type}</div>
      <div>Status: {status}</div>
      <div>Order Date: {orderDate ? new Date(orderDate).toLocaleDateString() : 'N/A'}</div>
      <div>Ship By Date: {shipByDate ? new Date(shipByDate).toLocaleDateString() : 'N/A'}</div>
      <div>Number of Items: {numberOfLines}</div>
    </div>
  );
};
