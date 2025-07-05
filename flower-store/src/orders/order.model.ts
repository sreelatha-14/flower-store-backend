// src/orders/order.model.ts
import { Model, RelationMappings, snakeCaseMappers } from 'objection';
import { User } from '../users/user.model';
import { OrderItem } from './order-item.model';


export class Order extends Model {
  static tableName = 'orders';
  
  // static get columnNameMappers() {
  //   return snakeCaseMappers();
  // }

  id!: number;
  user_id!: number;
  total!: number;
  created_at!: Date;

  static relationMappings: RelationMappings = {
    items: {
      relation: Model.HasManyRelation,
      modelClass: () => require('./order-item.model').OrderItem,
      join: {
        from: 'orders.id',
        to: 'order_items.order_id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => require('../users/user.model').User,
      join: {
        from: 'orders.user_id',
        to: 'users.id',
      },
    }
  };
}
