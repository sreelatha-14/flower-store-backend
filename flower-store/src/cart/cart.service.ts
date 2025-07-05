import { Injectable } from '@nestjs/common';
import { CartItem } from './cart.model';

@Injectable()
export class CartService {
    async addToCart(userId: number, flowerId: number, quantity: number) {
    const existing = await CartItem.query().findOne({ user_id: userId, flower_id:flowerId });

    if (existing) {
      return existing.$query().patchAndFetch({ quantity: existing.quantity + quantity });
    }

    return CartItem.query().insert({  user_id: userId, flower_id:flowerId, quantity:quantity });
    }

    async getCart(userId: number) {
        return CartItem.query()
        .where({ user_id:userId })
        .withGraphFetched('flower');
    }

    async clearCart(cartId: number) {
        return CartItem.query().delete().where({ id:cartId });
    }

    async updateCart(cartItemId:number,quantity:number) {
        const existing = await CartItem.query().findOne({ id:cartItemId });

        if (!existing) {
        throw new Error('Cart item not found');
        }

        return existing.$query().patchAndFetch({ quantity });
        }
}
