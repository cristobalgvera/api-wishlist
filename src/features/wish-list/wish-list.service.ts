import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto, ToggleCheckedDto } from './dtos';
import { ProductMapperService } from './product-mapper.service';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productMapperService: ProductMapperService,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepository.find();

    return products.map((product) => this.productMapperService.map(product));
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
