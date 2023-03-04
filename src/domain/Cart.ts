import { Discount } from './value-objects/Discount';
import { Product, ProductId } from './entities/Product';

export interface Cart {
  addItem(product: Product): void;
  getProductQuantity(id: ProductId): number;
  getProductPrice(id: ProductId): number;
  addDiscount(discount: Discount): void;
  clearDiscounts(): void;
  getTotal(): number;
  clear(): void;
}
