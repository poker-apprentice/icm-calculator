import sum from 'lodash/sum';
import { roundDecimals } from './helpers/roundDecimals';
import type { CalculateOptions, OmitStrict } from './types';

interface CalculateEstimateOptions extends OmitStrict<CalculateOptions, 'threshold'> {}

const DEFAULT_ITERATIONS = 10_000;

const getExponents = (chipStacks: number[]): number[] => {
  const t = sum(chipStacks) / chipStacks.length;
  return chipStacks.map((chipStack) => t / chipStack);
};

export const calculateEstimate = ({
  payouts,
  chipStacks,
  iterations = DEFAULT_ITERATIONS,
}: CalculateEstimateOptions): number[] => {
  const zeroPayouts = new Array(Math.max(0, chipStacks.length - payouts.length)).fill(0);
  payouts = [...payouts, ...zeroPayouts];

  const totalIterations = iterations * chipStacks.length;

  const equities: number[] = new Array(chipStacks.length).fill(0);
  const exponents: number[] = getExponents(chipStacks);
  const r: number[] = new Array(chipStacks.length).fill(0);

  const ids: number[] = new Array(chipStacks.length);
  for (let i = 0; i < ids.length; i += 1) {
    ids[i] = i;
  }

  const comparator = (a: number, b: number) => {
    if (r[a] < r[b]) {
      return 1;
    }
    if (r[a] > r[b]) {
      return -1;
    }
    return 0;
  };

  for (let iteration = 0; iteration < totalIterations; iteration += 1) {
    for (let i = 0; i < r.length; i += 1) {
      r[i] = Math.pow(Math.random(), exponents[i]);
    }
    ids.sort(comparator);
    for (let i = 0; i < payouts.length; i += 1) {
      equities[ids[i]] += payouts[i];
    }
  }

  for (let i = 0; i < equities.length; i += 1) {
    equities[i] /= totalIterations;
  }

  return equities.map(roundDecimals);
};
