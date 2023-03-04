import { Discount } from '../domain/value-objects/Discount';
import { Product, ProductId } from '../domain/entities/Product';
import { Cart } from '../domain/Cart';
import { CartItem } from '../domain/entities/CartItem';

export class InMemoryCart implements Cart {
  protected items: Record<ProductId, CartItem> = {};
  protected discounts: Record<string, Discount> = {};

  addItem({ code, name, price }: Product) {
    if (!this.items[code]) {
      this.items[code] = { product: { code, name, price }, quantity: 1 };
    } else {
      this.items[code].quantity++;
    }
  }

  getProductQuantity(code: ProductId): number {
    return this.items[code] ? this.items[code].quantity : 0;
  }

  getProductPrice(code: ProductId): number {
    return this.items[code] ? this.items[code].product.price : 0;
  }

  getTotal(): number {
    const total = Object.values(this.items).reduce(
      (acc, { product: { price }, quantity }) => acc + price * quantity,
      0
    );
    const discount = Object.values(this.discounts).reduce(
      (acc, discount) => acc + discount.amount,
      0
    );
    return +(total - discount).toFixed(2);
  }

  addDiscount(discount: Discount) {
    this.discounts[discount.id] = discount;
  }

  getDiscounts(): Discount[] {
    return Object.values(this.discounts);
  }

  clearDiscounts(): void {
    this.discounts = {};
  }

  clear(): void {
    this.discounts = {};
    this.items = {};
  }
}
