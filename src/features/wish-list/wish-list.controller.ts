import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { ToggleCheckedDto } from './dtos';

@Controller({
  path: 'wish-list',
  version: '1',
})
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Get()
  findAll() {
    return this.wishListService.findAll();
  }

  @Patch(':id')
  toggleChecked(
    @Param('id') id: number,
    @Body() toggleCheckedDto: ToggleCheckedDto,
  ) {
    return this.wishListService.toggleChecked(id, toggleCheckedDto);
  }
}
