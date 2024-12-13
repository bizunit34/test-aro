// CartPage.tsx
import React from 'react';

import { useToast } from '@/context/toast.context';

import { CartList } from '../../components/CartList';
import { CartSummary } from '../../components/CartSummary';
import { useCartContext } from '../../context/cart.context';
import styles from './CartPage.module.css';

export const CartPage: React.FC = () => {
  const { showToast } = useToast();
  const { cart, updateItemInCart, submitCart } = useCartContext();

  const handleQuantityChange = (itemId: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    updateItemInCart(itemId, { quantityOrdered: newQuantity });
  };

  const handleSubmit = (): void => {
    submitCart();
    alert('Cart submitted successfully!');
    showToast({
      message: 'Cart submitted successfully!',
      severity: 'success',
      duration: 4000,
    });
  };

  if (!cart) {
    return <div className={styles.emptyCart}>Your cart is empty.</div>;
  }

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>
      <CartSummary
        clientId={cart.fk_client__id}
        userId={cart.fk_user__id}
        type={cart.type}
        status={cart.status}
        orderDate={cart.orderDate}
        shipByDate={cart.shipByDate}
        numberOfLines={cart.numberOfLines}
      />
      <CartList items={cart.order_detail} onQuantityChange={handleQuantityChange} />
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Cart
      </button>
    </div>
  );
};
