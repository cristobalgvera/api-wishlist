import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dtos';

@Injectable()
export class ProductMapperService {
  map(product: Product): ProductDto {
    const { id, name, description, imageUrl, checked, checkedAt, checkedBy } =
      product;

    return {
      id,
      name,
      description,
      imageUrl,
      checked,
      checkedAt,
      checkedBy,
    };
  }
}
