import { ProductDto } from './product.dto';

export class GroupedProductsDto {
  checkedProducts: ProductDto[];
  uncheckedProducts: ProductDto[];
}
