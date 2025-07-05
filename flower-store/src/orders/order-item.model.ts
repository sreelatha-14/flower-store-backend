// src/orders/order-item.model.ts
import { Model, RelationMappings, snakeCaseMappers } from 'objection';
import { Order } from './order.model';
import { Flower } from '../flowers/flower.model';

export class OrderItem extends Model {
  static tableName = 'order_items';

  // static get columnNameMappers() {
  //     return snakeCaseMappers();
  // }

  id!: number;
  order_id!: number;
  flower_id!: number;
  quantity!: number;
  price!: number;

  static relationMappings: RelationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => require('./order.model').Order,
      join: {
        from: 'order_items.order_id',
        to: 'orders.id'
      }
    },
    flower: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => require('../flowers/flower.model').Flower,
      join: {
        from: 'order_items.flower_id',
        to: 'flowers.id'
      }
    }
  };
}
