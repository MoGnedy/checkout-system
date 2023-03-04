import { Product } from '../../domain/entities/Product';

export interface Checkout {
  get total(): number;

  scan(product: Product): void;
  
  clearCart(): void;
}
