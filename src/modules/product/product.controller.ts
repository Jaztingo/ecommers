import { Controller, Get, Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get(':id')
  getproduct(@Param('id') id: number): any {
    return `id: ${id}`;
  }

  @Get(':name?/:cat_id?')
  getList(@Param('name') name: string, @Param('cat_id') catId: string): any {
    return `name: ${name}; cat_id: ${catId}`;
  }
}
