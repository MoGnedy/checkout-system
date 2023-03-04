import { Cart } from '../Cart';

export interface PromotionRule {
  readonly id: string;
  readonly name: string;
  canApply(cart: Cart): boolean;
  apply: (cart: Cart) => void;
}
