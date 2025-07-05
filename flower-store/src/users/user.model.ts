import { Model, RelationMappings } from 'objection';
import { CartItem } from 'src/cart/cart.model';
import { Order } from 'src/orders/order.model';

export class User extends Model {
  static tableName = 'users';

  id!: number;
  name!: string;
  email!: string;
  password!: string;

  static relationMappings: RelationMappings = {
    cartItems: {
      relation: Model.HasManyRelation,
      modelClass: CartItem,
      join: {
        from: 'users.id',
        to: 'cart_items.user_id'
      }
    },
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'users.id',
        to: 'orders.user_id'
      }
    }
  };
}
