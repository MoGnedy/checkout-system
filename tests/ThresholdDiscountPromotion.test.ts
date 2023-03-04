import { v4 as uuidv4 } from 'uuid';

import { ThresholdDiscountPromotion } from '../src/application/promotions/ThresholdDiscountPromotion';
import { Product } from '../src/domain/entities/Product';
import { InMemoryCart } from '../src/infrastructure/InMemoryCart';

describe('ThresholdDiscountPromotion tests', () => {
  const strategy = new ThresholdDiscountPromotion(uuidv4(), '10%', 30, 10);
  const pizza: Product = {
    code: '002',
    name: 'Pizza Margherita',
    price: 6.99,
  };

  it('should not apply discount for 1 pizza', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);

    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();

    expect(total).toBe(6.99);
  });

  it('should not apply discount for 2 pizzas', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);
    cart.addItem(pizza);
    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();
    expect(total).toBe(6.99 * 2);
  });

  it('should apply discount for 5 pizzas', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);

    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();

    expect(total).toBe(+(6.99 * 5 * 0.9).toFixed(2));
  });
});
