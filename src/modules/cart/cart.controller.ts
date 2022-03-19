import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartProductDto } from './dto/cart-product.dto';

@Controller('cart')
export class CartController {
  @Get('count')
  getCartCount(): any {
    return 5;
  }
  @Get('product')
  product(): any {
    return 'list';
  }

  @Post()
  addProductToCart(@Body() cartProductDto: CartProductDto): any {
    return '3';
  }
  
  @Delete(':id')
  removeProductToCart(@Param('id') id: number): any {
    return 'removed';
  }
}
