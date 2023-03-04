import { Checkout } from '../../application/services/Checkout';
import { PromotionRule } from '../../domain/entities/PromotionRule';
import { Product } from '../../domain/entities/Product';
import { InMemoryCart } from '../InMemoryCart';
import { Cart } from '../../domain/Cart';

export class CheckoutService implements Checkout {
  constructor(
    private promotions: PromotionRule[] = [],
    private cart: Cart = new InMemoryCart()
  ) {}

  get total(): number {
    this.applyPromotions();
    return this.cart.getTotal();
  }

  scan(product: Product) {
    this.cart.addItem(product);
  }

  clearCart() {
    this.cart.clear();
  }

  private applyPromotions(): void {
    this.cart.clearDiscounts();
    for (const promotion of this.promotions) {
      promotion.apply(this.cart);
    }
  }
}
