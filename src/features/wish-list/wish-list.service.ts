import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupedProductsDto, ToggleCheckedDto } from './dtos';
import { ProductMapperService } from './product-mapper.service';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productMapperService: ProductMapperService,
  ) {}

  async findAll(): Promise<GroupedProductsDto> {
    const products = await this.productRepository.find();

    const { checked, unchecked } = this.groupProducts(products);

    return {
      checkedProducts: checked.map(this.productMapperService.map),
      uncheckedProducts: unchecked.map(this.productMapperService.map),
    };
  }

  groupProducts(products: Product[]) {
    return products.reduce(
      (groupedProducts, product) => {
        if (product.checked) groupedProducts.checked.push(product);
        else groupedProducts.unchecked.push(product);

        return groupedProducts;
      },
      { checked: [], unchecked: [] } as {
        checked: Product[];
        unchecked: Product[];
      },
    );
  }

  async toggleChecked(
    id: number,
    toggleCheckedDto: ToggleCheckedDto,
  ): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    const updatedProduct = product.checked
      ? this.handleUncheck(product)
      : this.handleCheck(product, toggleCheckedDto.toggledBy);

    await this.productRepository.save(updatedProduct);
  }

  private handleCheck(product: Product, checkedBy: string) {
    return this.productRepository.merge(product, {
      checked: true,
      checkedAt: new Date(),
      checkedBy,
    });
  }

  private handleUncheck(product: Product) {
    return this.productRepository.merge(product, {
      checked: false,
      checkedAt: null,
      checkedBy: null,
    });
  }
}
