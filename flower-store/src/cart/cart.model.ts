// src/cart/cart.model.ts
import { Model, RelationMappings, snakeCaseMappers } from 'objection';
import { Flower } from 'src/flowers/flower.model';
import { User } from 'src/users/user.model';


export class CartItem extends Model {
  static tableName = 'cart_items';

  // static get columnNameMappers() {
  //     return snakeCaseMappers();
  // }

  id!: number;
  user_id!: number;
  flower_id!: number;
  quantity!: number;
  

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'cart_items.user_id',
        to: 'users.id'
      }
    },
    flower: {
      relation: Model.BelongsToOneRelation,
      modelClass: Flower,
      join: {
        from: 'cart_items.flower_id',
        to: 'flowers.id'
      }
    }
  };
}
