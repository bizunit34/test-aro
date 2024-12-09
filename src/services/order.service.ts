import { OrderModel } from '@/models/objects/order.model';

class OrderService {
  private orders: Array<OrderModel> = [
    {
      _id: 1,
      fk_client__id: 1,
      orderDate: new Date('2023-11-20'),
      total: 150.5,
      numberOfLines: 2,
      order_detail: [
        {
          _id: 1,
          fk_item__id: 101,
          description: 'Widget A',
          quantityOrdered: 2,
          quantityBackordered: 0,
          quantityShipped: 0,
          price: 50,
        },
        {
          _id: 2,
          fk_item__id: 102,
          description: 'Gadget B',
          quantityOrdered: 1,
          quantityBackordered: 0,
          quantityShipped: 0,
          price: 50.5,
        },
      ],
    },
    {
      _id: 2,
      fk_client__id: 2,
      orderDate: new Date('2023-11-21'),
      total: 200,
      numberOfLines: 1,
      order_detail: [
        {
          _id: 3,
          fk_item__id: 103,
          description: 'Tool C',
          quantityOrdered: 4,
          quantityBackordered: 0,
          quantityShipped: 0,
          price: 50,
        },
      ],
    },
    {
      _id: 3,
      fk_client__id: 1,
      orderDate: new Date('2023-11-22'),
      total: 300,
      numberOfLines: 1,
      order_detail: [
        {
          _id: 4,
          fk_item__id: 104,
          description: 'Device D',
          quantityOrdered: 3,
          quantityBackordered: 0,
          quantityShipped: 0,
          price: 100,
        },
      ],
    },
  ];

  public getAllOrders(): Array<OrderModel> {
    return this.orders;
  }

  public getOrderById(orderId: number): OrderModel | undefined {
    const order = this.orders.find((o) => o._id === orderId);

    return order;
  }
}

const OrderServiceInstance: OrderService = new OrderService();

export default OrderServiceInstance;
