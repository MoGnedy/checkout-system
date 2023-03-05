# Checkout System

This is an implementation of a checkout system that allows items to be scanned in any order and applies certain promotional rules to give discounts. It is built with TypeScript and follows a clean architecture pattern.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Trade-offs](#trade-offs)

## Requirements

To run this system, you'll need the following:

Node.js (v18.4.2 or later)
npm (v9.6.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mognedy/checkout-system.git
   ```

2. Install the dependencies:

   ```bash
   cd checkout-system
    npm install
   ```

3. Run the tests:
   ```bash
   npm test
   ```


## Features
The checkout system supports the following features:

* Scanning items in any order
* Applying promotional campaigns to give discounts
* Flexibility to define your own promotional rules

## Usage

```
// create some products
const products = [
  { code: '001', name: 'Curry Sauce', price: 1.95 },
  { code: '002', name: 'Pizza', price: 5.99 },
  { code: '003', name: 'Men’s T-Shirt', price: 25.00 },
];

// create promotion rules
const promotions = [
  new QuantityDiscountPromotion("id1","Pizza", "002", 2, 3.99),
  new ThresholdDiscountPromotion("id2", "Total 10%", 30, 10),
];

// create a new checkout instance
const co = new Checkout(promotions);

// add some items to the cart
co.scan(products[0]);
co.scan(products[1]);
co.scan(products[2]);

// get the total price of the cart
const total = co.total;

console.log(total); 
```


## Trade-offs

In implementing the checkout system with promotional rules, there are several trade-offs that were made. Here are some of them and their justifications:

1. Using the Strategy pattern: The Strategy pattern was used to implement the promotions.
This allows for a modular and extensible design, where each promotion strategy can be implemented independently of the others.
The trade-off is that it can be more complex to manage and maintain multiple strategies.

2. No API implementation: An API was not implemented as it was not a requirement. This allowed for a simpler and more focused implementation. 
The trade-off is that it may not be suitable for integration with other systems or for future expansion.

Overall, these trade-offs were made to prioritize simplicity, modularity, maintainability, and predictability of the system.
The justifications were based on the specific requirements of the project and the available resources.