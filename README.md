# ICM Calculator

ICM calculator for final table poker deals, based upon the Malmuth-Harville equation in section 2.2 of [this article](http://mathsociety.ph/matimyas/images/vol43/MarfilMatimyas.pdf) from the Journal of the Mathematical Society of the Philippines.

This implementation in inspired by [gpratte/icm-calculator](https://github.com/gpratte/icm-calculator).

## Installation

Add `@poker-apprentice/icm-calculator` as a dependency.

- yarn:
  ```bash
  yarn add @poker-apprentice/icm-calculator
  ```
- npm:
  ```bash
  npm install @poker-apprentice/icm-calculator --save
  ```

## Usage

This package exports a `calculate` function that can be used to calculate ICM payouts for a poker tournament based upon prize values and remaining chip stacks. To use it, simply pass an object containing numeric arrays of `payouts` values and `chipStacks` values.

```ts
import { calculate } from '@poker-apprentice/icm-calculator';

const icmAmounts = calculate({
  payouts: [425, 280, 130, 75],
  chipStacks: [150000, 98750, 45500, 13250],
});
console.log(icmAmounts); // => [323.2, 278.12, 195.79, 112.89]
```

## Contributing

If you'd like to fix a bug, add a feature, improve the documentation, or anything else to better this library, pull requests are welcomed!

1. Clone the repository:
   ```bash
   git clone git@github.com:poker-apprentice/icm-calculator.git
   ```
1. Install dependencies:
   ```bash
   yarn install
   ```
1. Include tests for your changes, and open a pull request.

If you are interested in contributing, but you are stuck or lost at any point in your efforts, please reach out for help!
