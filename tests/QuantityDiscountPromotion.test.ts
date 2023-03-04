import { v4 as uuidv4 } from 'uuid';

import { InMemoryCart } from '../src/infrastructure/InMemoryCart';
import { Product } from '../src/domain/entities/Product';
import { QuantityDiscountPromotion } from '../src/application/promotions/QuantityDiscountPromotion';

describe('QuantityDiscountPromotion tests', () => {
  const strategy = new QuantityDiscountPromotion(
    uuidv4(),
    'Pizza',
    '002',
    2,
    3.99
  );
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

  it('should apply discount for 2 pizzas', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);
    cart.addItem(pizza);
    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();
    expect(total).toBe(3.99 * 2);
  });

  it('should apply discount for 3 pizzas', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);

    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();

    expect(total).toBe(3.99 * 3);
  });

  it('should apply discount for 4 pizzas', () => {
    const cart = new InMemoryCart();
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);
    cart.addItem(pizza);

    if (strategy.canApply(cart)) {
      strategy.apply(cart);
    }
    const total = cart.getTotal();

    expect(total).toBe(3.99 * 4);
  });
});
