import { v4 as uuidv4 } from 'uuid';
import { QuantityDiscountPromotion } from '../src/application/promotions/QuantityDiscountPromotion';
import { ThresholdDiscountPromotion } from '../src/application/promotions/ThresholdDiscountPromotion';
import { Product } from '../src/domain/entities/Product';
import { PromotionRule } from '../src/domain/entities/PromotionRule';
import { CheckoutService } from '../src/infrastructure/services/CheckoutService';

const products: Product[] = [
  { code: '001', name: 'Curry Sauce', price: 1.95 },
  { code: '002', name: 'Pizza', price: 5.99 },
  { code: '003', name: "Men's T-Shirt", price: 25.0 },
];

describe('Checkout tests', () => {
  const promotions: PromotionRule[] = [
    new QuantityDiscountPromotion(uuidv4(), 'Pizza', '002', 2, 3.99),
    new ThresholdDiscountPromotion(uuidv4(), 'Total 10%', 30, 10),
  ];

  const checkout = new CheckoutService(promotions);

  beforeEach(() => {
    checkout.clearCart();
  });

  it('No Promotions should be applied', () => {
    checkout.scan(products[0]);
    checkout.scan(products[1]);
    checkout.scan(products[2]);
    const total = checkout.total;

    expect(total).toBe(29.65);
  });

  it('QuantityDiscountPromotion Promotion should be applied for 2 pizzas', () => {
    checkout.scan(products[1]);
    checkout.scan(products[0]);
    checkout.scan(products[1]);
    const total = checkout.total;

    expect(total).toBe(9.93);
  });

  it('QuantityDiscountPromotion Promotion should be applied for 4 pizzas', () => {
    checkout.scan(products[1]);
    checkout.scan(products[1]);
    checkout.scan(products[1]);
    checkout.scan(products[1]);

    const total = checkout.total;

    expect(total).toBe(15.96);
  });

  it('QuantityDiscountPromotion for 2 pizzas & ThresholdDiscountPromotion for total prize both should be applied', () => {
    checkout.scan(products[1]);
    checkout.scan(products[0]);
    checkout.scan(products[1]);
    checkout.scan(products[2]);
    const total = checkout.total;

    expect(total).toBe(31.44);
  });
});
