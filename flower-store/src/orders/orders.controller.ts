import { Controller, Get, Post, Request,    UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    placeOrder(@Request() req) {
        return this.ordersService.placeOrder(req.user.userId);
    }

    @Get()
    getOrders(@Request() req) {
        return this.ordersService.getOrders(req.user.userId);
    }
}
