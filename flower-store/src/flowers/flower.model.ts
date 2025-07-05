// src/flowers/flower.model.ts
import { Model, RelationMappings, snakeCaseMappers } from 'objection';
import { CartItem } from 'src/cart/cart.model';
import { OrderItem } from 'src/orders/order-item.model';


export class Flower extends Model {
  static tableName = 'flowers';
  
  static get columnNameMappers() {
      return snakeCaseMappers();
  }

  id!: number;
  name!: string;
  description!: string;
  price!: number;
  imageUrl!: string;

  static relationMappings: RelationMappings = {
    cartItems: {
      relation: Model.HasManyRelation,
      modelClass: CartItem,
      join: {
        from: 'flowers.id',
        to: 'cart_items.flower_id'
      }
    },
    orderItems: {
      relation: Model.HasManyRelation,
      modelClass: OrderItem,
      join: {
        from: 'flowers.id',
        to: 'order_items.flower_id'
      }
    }
  };
}
