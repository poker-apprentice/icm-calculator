import sum from 'lodash/sum';
import { calculateEstimate } from './calculateEstimate';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toBeBetween(a: number, b: number): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeBetween(received: number, a: number, b: number) {
    if (a > b) {
      [a, b] = [b, a];
    }

    const pass = received >= a && received <= b;
    const message = pass
      ? () => `expected ${received} not to be between ${a} and ${b}`
      : () => `expected ${received} to be between ${a} and ${b}`;

    return { message, pass };
  },
});

describe('calculateEstimate', () => {
  it('works', () => {
    calculateEstimate({ payouts: [], chipStacks: [], iterations: 1 });
    expect(true).toBe(true);
  });

  it('works for two payouts and two players', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1200];
    const result = calculateEstimate({ payouts, chipStacks });
    expect(result[0]).toBeBetween(88.33, 90.33);
    expect(result[1]).toBeBetween(85.67, 87.67);
    expect(sum(result)).toBeCloseTo(sum(payouts), 0);
  });

  it('works for ten payouts and ten players', () => {
    const payouts = [50_000, 30_000, 20_000, 14_000, 11_000, 9_500, 8_500, 7_750, 7_250, 6_900];
    const chipStacks = [
      15_000, 20_000, 47_000, 9_000, 28_000, 34_000, 16_000, 12_000, 31_000, 22_000,
    ];
    const result = calculateEstimate({ payouts, chipStacks });
    // expect(result[0]).toBeBetween(13730, 13835);
    // expect(result[1]).toBeBetween(15581, 15697);
    // expect(result[2]).toBeBetween(23267, 23599);
    // expect(result[3]).toBeBetween(11207, 11394);
    // expect(result[4]).toBeBetween(18092, 18211);
    // expect(result[5]).toBeBetween(20027, 20053);
    // expect(result[6]).toBeBetween(14023, 14327);
    // expect(result[7]).toBeBetween(12441, 12737);
    // expect(result[8]).toBeBetween(19231, 19449);
    // expect(result[9]).toBeBetween(16292, 16390);
    expect(sum(result)).toBeCloseTo(sum(payouts), 0);
  });
});
