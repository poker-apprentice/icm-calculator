# ICM Calculator

Calculate ICM equities for poker tournament payouts.

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

### `calculateExact`

The `calculateExact` function is based upon the Malmuth-Harville equation in section 2.2 of [this article](http://mathsociety.ph/matimyas/images/vol43/MarfilMatimyas.pdf) from the Journal of the Mathematical Society of the Philippines. Because `calculateExact` becomes exponentially more expensive as the size of `chipStacks` grows, it is not recommended to utilize this function beyond a small sampling.

This implementation in inspired by [gpratte/icm-calculator](https://github.com/gpratte/icm-calculator).

```ts
import { calculateExact } from '@poker-apprentice/icm-calculator';

const icmAmounts = calculateExact({
  payouts: [425, 280, 130, 75],
  chipStacks: [150000, 98750, 45500, 13250],
});
console.log(icmAmounts); // => [323.2, 278.12, 195.79, 112.89]
```

### `calculateEstimate`

The `calculateEstimate` function performs a [Monte Carlo simulation](https://en.wikipedia.org/wiki/Monte_Carlo_method) (i.e.: random sampling) to come up with an acceptable approximate ICM calculation. This is based upon the ICM equities algorithm proposed by Tysen Streib on the [2+2 forums](https://forumserver.twoplustwo.com/15/poker-theory-amp-gto/new-algorithm-calculate-icm-large-tournaments-1098489/).

For larger data sets represented by `chipStacks`, the `calculateEstimate` function is recommended over `calculateExact` for time-sensitive implementations.

```ts
import { calculateEstimate } from '@poker-apprentice/icm-calculator';

const icmAmounts = calculateEstimate({
  payouts: [425, 280, 130, 75],
  chipStacks: [150000, 98750, 45500, 13250],
});
console.log(icmAmounts); // => [323.2, 278.12, 195.79, 112.89]
```

Optionally, an `iterations` option can be provided to override the default value of 10,000. This value specifies how many Monte Carlo simulations should be performed per the number of chip stacks provided in `chipStacks`. (For example, if `chipsStacks` is set to `[1000, 500]` and `iterations` is set to 10, then 2×10=20 total calculations will be performed.)

```ts
import { calculateEstimate } from '@poker-apprentice/icm-calculator';

const icmAmounts = calculateEstimate({
  payouts: [425, 280, 130, 75],
  chipStacks: [150000, 98750, 45500, 13250],
  iterations: 250,
});
console.log(icmAmounts); // => [323.2, 278.12, 195.79, 112.89]
```

### `calculate`

The `calculate` function delegates to either `calculateExact` or `calculateEstimate` based upon the number of `chipStacks` provided.

```ts
import { calculate } from '@poker-apprentice/icm-calculator';

const icmAmounts = calculate({
  payouts: [425, 280, 130, 75],
  chipStacks: [150000, 98750, 45500, 13250],
});
console.log(icmAmounts); // => [323.2, 278.12, 195.79, 112.89]
```

Optionally, a `threshold` option can be provided to override the default value of 5. This value specifies whether the `calculateExact` or `calculateEstimate` function will be utilized based upon the size of `chipStacks`.

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
