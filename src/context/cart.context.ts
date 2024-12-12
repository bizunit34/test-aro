import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderModel, OrderDetailModel } from '../models';
import { OrderTypeEnum, OrderStatusEnum } from '../enum';

interface CartContextType {
  cart: OrderModel | null;
  getCart: () => OrderModel | null;
  createCart: (clientId: number, userId: number) => void;
  deleteCart: () => void;
  submitCart: () => void;
  addItemToCart: (item: OrderDetailModel) => void;
  updateItemInCart: (itemId: number, updatedItem: Partial<OrderDetailModel>) => void;
  removeItemFromCart: (itemId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper functions for localStorage
const saveCartToLocalStorage = (cart: OrderModel | null) => {
  if (cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    localStorage.removeItem('cart');
  }
};

const getCartFromLocalStorage = (): OrderModel | null => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : null;
};

// CartContextProvider Component
export const CartContextProvider: (({ children }: { children: unknown; }) => {}) = ({ children }) => {
  const [cart, setCart] = useState<OrderModel | null>(getCartFromLocalStorage);

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const getCart = () => {
    return cart;
  };

  const createCart = (clientId: number, userId: number) => {
    const newCart: OrderModel = {
      _id: Date.now(), // Temporary unique ID
      fk_client__id: clientId,
      fk_user__id: userId,
      type: OrderTypeEnum.CART,
      status: OrderStatusEnum.OPEN,
      numberOfLines: 0,
      order_detail: [],
    };
    setCart(newCart);
  };

  const deleteCart = () => {
    setCart(null);
  };

  const submitCart = () => {
    if (!cart) return;

    setCart({
      ...cart,
      status: OrderStatusEnum.SUBMITTED,
      type: OrderTypeEnum.COMPLETED,
    });
  };

  const addItemToCart = (item: OrderDetailModel) => {
    if (!cart) return;

    const existingItemIndex = cart.order_detail.findIndex(
      (existingItem) => existingItem._id === item._id
    );

    let updatedDetails;
    if (existingItemIndex !== -1) {
      // Update the existing item
      updatedDetails = cart.order_detail.map((existingItem, index) =>
        index === existingItemIndex
          ? { ...existingItem, quantityOrdered: existingItem.quantityOrdered + item.quantityOrdered }
          : existingItem
      );
    } else {
      // Add the new item
      updatedDetails = [...cart.order_detail, item];
    }

    setCart({
      ...cart,
      order_detail: updatedDetails,
      numberOfLines: updatedDetails.length,
    });
  };

  const updateItemInCart = (itemId: number, updatedItem: Partial<OrderDetailModel>) => {
    if (!cart) return;

    const updatedDetails = cart.order_detail.map((item) =>
      item._id === itemId ? { ...item, ...updatedItem } : item
    );

    setCart({ ...cart, order_detail: updatedDetails });
  };

  const removeItemFromCart = (itemId: number) => {
    if (!cart) return;

    const updatedDetails = cart.order_detail.filter((item) => item._id !== itemId);
    setCart({
      ...cart,
      order_detail: updatedDetails,
      numberOfLines: updatedDetails.length,
    });
  };

  return (
    <CartContext.Provider value={{cart,getCart,createCart,deleteCart,submitCart,addItemToCart,updateItemInCart,removeItemFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for accessing CartContext
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  return context;
};
