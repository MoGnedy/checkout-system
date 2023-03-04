import { Cart } from '../Cart';

export interface PromotionRule {
  readonly name: string;
  canApply(cart: Cart): boolean;
  apply: (cart: Cart) => void;
}
