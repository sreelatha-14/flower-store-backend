import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FlowersModule } from './flowers/flowers.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { KnexModule } from './db/knex.module';

@Module({
  imports: [AuthModule, FlowersModule, CartModule, OrdersModule, UsersModule,KnexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
