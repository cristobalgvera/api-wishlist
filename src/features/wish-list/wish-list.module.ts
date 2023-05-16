import { Module } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductMapperService } from './product-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [WishListService, ProductMapperService],
  controllers: [WishListController],
})
export class WishListModule {}
