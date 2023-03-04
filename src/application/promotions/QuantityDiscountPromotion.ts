import { Cart } from '../../domain/Cart';
import { PromotionRule } from '../../domain/entities/PromotionRule';

export class QuantityDiscountPromotion implements PromotionRule {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private productId: string,
    private threshold: number,
    private discountPrice: number
  ) {}
  canApply(cart: Cart): boolean {
    const productQuantity = cart.getProductQuantity(this.productId);
    return productQuantity >= this.threshold;
  }

  apply(cart: Cart): void {
    if (!this.canApply(cart)) {
      return;
    }

    const productQuantity = cart.getProductQuantity(this.productId);
    const discount =
      productQuantity *
      (cart.getProductPrice(this.productId) - this.discountPrice);
    cart.addDiscount({ id: this.id, name: this.name, amount: discount });
  }
}
