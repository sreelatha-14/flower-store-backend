import { Controller, Post, UseGuards,Request, Body, Get, Delete, Param, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    addToCart(@Request() req, @Body() body: { flowerId: number; quantity: number }) {
        return this.cartService.addToCart(req.user.userId, body.flowerId, body.quantity);
    }

    @Get()
    getCart(@Request() req) {
        return this.cartService.getCart(req.user.userId);
    }

    @Delete('clear/:cartId')
    clearCart(@Param('cartId') cartId: number) {
        return this.cartService.clearCart(cartId);
    }
    @Put('update')
    updateCartItem(@Body() body: { cartItemId: number,quantity:number }){
        return this.cartService.updateCart(body.cartItemId,body.quantity)
    }

}
