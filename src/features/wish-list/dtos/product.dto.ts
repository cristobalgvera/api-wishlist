export class ProductDto {
  id: number;
  name: string;
  description: string;
  checked: boolean;
  imageUrl: string;
  checkedBy?: string | null;
  checkedAt?: Date | null;
}
