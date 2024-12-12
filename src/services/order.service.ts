import { BehaviorSubject, Observable, of } from 'rxjs';

import { OrderStatusEnum, OrderTypeEnum } from '@/enum';
import { ItemModel, OrderDetailModel } from '@/models';
import { OrderModel } from '@/models/objects/order.model';

import LocalStorageServiceInstance from './local-storage.service';

class OrderService {
  private static readonly CART_KEY: string = 'cart';
  private activeCart: BehaviorSubject<OrderModel | undefined> | undefined;
  private orders: Array<OrderModel> = [
    {
      _id: 1,
      fk_client__id: 1,
      fk_user__id: 1,
      orderDate: new Date('2023-11-20'),
      type: OrderTypeEnum.COMPLETED,
      status: OrderStatusEnum.CLOSED,
      //   total: 150.5,
      numberOfLines: 2,
      order_detail: [
        {
          _id: 1,
          fk_item__id: 101,
          description: 'Widget A',
          quantityOrdered: 2,
          quantityBackordered: 0,
          quantityShipped: 0,
          //   price: 50,
        },
        {
          _id: 2,
          fk_item__id: 102,
          description: 'Gadget B',
          quantityOrdered: 1,
          quantityBackordered: 0,
          quantityShipped: 0,
          //   price: 50.5,
        },
      ],
    },
    {
      _id: 2,
      fk_client__id: 2,
      fk_user__id: 2,
      orderDate: new Date('2023-11-21'),
      type: OrderTypeEnum.COMPLETED,
      status: OrderStatusEnum.CLOSED,
      //   total: 200,
      numberOfLines: 1,
      order_detail: [
        {
          _id: 3,
          fk_item__id: 103,
          description: 'Tool C',
          quantityOrdered: 4,
          quantityBackordered: 0,
          quantityShipped: 0,
          //   price: 50,
        },
      ],
    },
    {
      _id: 3,
      fk_client__id: 1,
      fk_user__id: 1,
      orderDate: new Date('2023-11-22'),
      type: OrderTypeEnum.COMPLETED,
      status: OrderStatusEnum.CLOSED,
      //   total: 300,
      numberOfLines: 1,
      order_detail: [
        {
          _id: 4,
          fk_item__id: 104,
          description: 'Device D',
          quantityOrdered: 3,
          quantityBackordered: 0,
          quantityShipped: 0,
          //   price: 100,
        },
      ],
    },
  ];

  public getAllOrders(): Array<OrderModel> {
    return this.orders;
  }

  public getOrderById(orderId: number): OrderModel | undefined {
    const order = this.orders.find((order) => order._id === orderId);

    return order;
  }

  public createOrder(options: OrderCreationOptions): OrderModel {
    const { clientId, userId, type, status, updatedOrderDetails } = options;

    if (type === OrderTypeEnum.CART && this.getCart() != null) {
      // This error is meant to be internal only. When creating a cart, utilize the createCart method.
      throw new Error('A cart already exists. Please update the current cart.');
    }

    const header: Omit<OrderModel, 'order_detail'> = this.createOrderHeader(
      clientId,
      userId,
      type,
      status,
      updatedOrderDetails.length,
    );

    const details: Array<OrderDetailModel> = [];
    let detailId: number = 1;

    for (const detail of updatedOrderDetails) {
      details.push(
        this.createOrderDetailRecord(
          detail.item,
          detail.quantityOrdered,
          detailId,
        ),
      );
      detailId++;
    }

    return {
      ...header,
      order_detail: details,
    };
  }

  public createCart(options: Omit<OrderCreationOptions, 'type'>): OrderModel {
    const existingCart: OrderModel | undefined = this.activeCart?.value;

    if (existingCart != null) {
      return this.updateCart({ ...options, type: OrderTypeEnum.CART });
    }

    const cart: OrderModel = this.createOrder({
      ...options,
      type: OrderTypeEnum.CART,
    });
    this.setCart(cart);

    return cart;
  }

  public updateCart(options: OrderCreationOptions): OrderModel {
    const { updatedOrderDetails } = options;
    const existingCart: OrderModel | undefined = this.activeCart?.value;

    if (existingCart == null) {
      return this.createOrder(options);
    }

    const details: Array<OrderDetailModel> = [];
    let detailId: number = details[details.length - 1]._id + 1;
    const itemIdMap: { [itemId: string]: number } = {};

    for (const detail of existingCart.order_detail) {
      itemIdMap[detail.fk_item__id] = detail._id;
    }

    for (const detail of updatedOrderDetails) {
      if (itemIdMap[detail.item._id] != null) {
        existingCart.order_detail[itemIdMap[detail.item._id]] = {
          ...existingCart.order_detail[itemIdMap[detail.item._id]],
          quantityOrdered: detail.quantityOrdered,
        };
        continue;
      }

      const newDetailRecord: OrderDetailModel = this.createOrderDetailRecord(
        detail.item,
        detail.quantityOrdered,
        detailId,
      );
      details.push(newDetailRecord);
      detailId++;
    }

    const updatedCart: OrderModel = {
      ...existingCart,
      numberOfLines: details.length,
      order_detail: details,
    };
    this.setCart(updatedCart);

    return updatedCart;
  }

  public addToCart(
    orderDetailId: number,
    options: { quantityOrdered: number },
  ): void {
    const details: Array<OrderDetailModel> = [];
    const activeCart: OrderModel | undefined = this.activeCart?.value;

    if (activeCart == null) {
      console.error(
        `The detail could not be removed due to the cart not existing.`,
      );

      return;
    }

    for (const detail of activeCart?.order_detail ?? []) {
      if (detail._id === orderDetailId) {
        details.push({
          ...detail,
          quantityOrdered: options.quantityOrdered,
        });
      }

      details.push(detail);
    }

    this.setCart({
      ...activeCart,
      numberOfLines: details.length,
      order_detail: details,
    });
  }

  public removeOrderDetailFromCart(orderDetailId: number): void {
    const details: Array<OrderDetailModel> = [];
    const activeCart: OrderModel | undefined = this.activeCart?.value;

    if (activeCart == null) {
      console.error(
        `The detail could not be removed due to the cart not existing.`,
      );

      return;
    }

    for (const detail of activeCart?.order_detail ?? []) {
      if (detail._id === orderDetailId) {
        continue;
      }

      details.push(detail);
    }

    this.setCart({
      ...activeCart,
      numberOfLines: details.length,
      order_detail: details,
    });
  }

  public getCart(): Observable<OrderModel | undefined> {
    if (this.activeCart != null) {
      return this.activeCart;
    }

    const existingCartString: string | null = LocalStorageServiceInstance.get(
      OrderService.CART_KEY,
    );

    if (existingCartString == null) {
      return of(undefined);
    }

    const cart: OrderModel = JSON.parse(existingCartString) as OrderModel;

    if (this.activeCart == null) {
      this.activeCart = new BehaviorSubject<OrderModel | undefined>(undefined);
      this.activeCart?.next(cart);
    }

    return this.activeCart ?? of(undefined);
  }

  public setCart(cart: OrderModel): void {
    this.activeCart?.next(cart);
    LocalStorageServiceInstance.set(
      OrderService.CART_KEY,
      JSON.stringify(cart),
    );
  }

  public submitCart(): void {
    console.log('The cart has been submitted!');
    console.log('Cart: ', this.activeCart);

    this.clearCart();
  }

  public clearCart(): void {
    this.activeCart = undefined;
    LocalStorageServiceInstance.remove(OrderService.CART_KEY);
  }

  public createOrderHeader(
    clientId: number,
    userId: number,
    type: OrderTypeEnum,
    status: OrderStatusEnum,
    numberOfLines: number,
  ): Omit<OrderModel, 'order_detail'> {
    return {
      _id: 3,
      fk_client__id: clientId,
      fk_user__id: userId,
      orderDate: new Date(),
      type,
      status,
      numberOfLines,
    };
  }

  public createOrderDetailRecord(
    item: ItemModel,
    quantityOrdered: number,
    detailId: number,
  ): OrderDetailModel {
    return {
      _id: detailId,
      fk_item__id: item._id,
      description: item.name,
      quantityOrdered,
      quantityBackordered: 0,
      quantityShipped: 0,
    };
  }
}

interface OrderCreationOptions {
  clientId: number;
  userId: number;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
  updatedOrderDetails: Array<{
    item: ItemModel;
    quantityOrdered: number;
  }>;
}

const OrderServiceInstance: OrderService = new OrderService();

export default OrderServiceInstance;
