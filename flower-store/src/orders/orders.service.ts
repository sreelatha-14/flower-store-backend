import { BadRequestException, Injectable } from '@nestjs/common';
import { CartItem } from 'src/cart/cart.model';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';

@Injectable()
export class OrdersService {
    async placeOrder(userId: number) {
    const cartItems:any = await CartItem.query().where({ user_id:userId }).withGraphFetched('flower');

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.flower.price, 0);
    const item = {
      user_id:userId,
      total: total
    }

    const order = await Order.query().insert(item);

    const items = cartItems.map((item) => ({
      order_id: order.id,
      flower_id: item.flower_id,
      quantity: item.quantity,
      price: item.flower.price,
    }));

    await OrderItem.query().insert(items);
    await CartItem.query().delete().where({ user_id:userId });

    return order;
  }

  async getOrders(userId: number) {
    return Order.query()
      .where({ user_id:userId })
      .withGraphFetched('items.flower')
      .orderBy('created_at', 'desc');
  }
}
