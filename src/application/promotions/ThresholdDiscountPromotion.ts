import { Cart } from '../../domain/Cart';
import { PromotionRule } from '../../domain/entities/PromotionRule';

export class ThresholdDiscountPromotion implements PromotionRule {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private threshold: number,
    private discountPercent: number
  ) {}

  canApply(cart: Cart): boolean {
    const total = cart.getTotal();

    return total >= this.threshold;
  }

  apply(cart: Cart): void {
    if (!this.canApply(cart)) {
      return;
    }
    const total = cart.getTotal();

    const discountAmount = total * (this.discountPercent / 100);
    cart.addDiscount({ id: this.id, name: this.name, amount: discountAmount });
  }
}
