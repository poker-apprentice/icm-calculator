import { calculateEstimate } from './calculateEstimate';
import { calculateExact } from './calculateExact';
import type { CalculateOptions } from './types';

const DEFAULT_THRESHOLD = 5;

export const calculate = ({
  threshold = DEFAULT_THRESHOLD,
  ...options
}: CalculateOptions): number[] => {
  if (options.chipStacks.length >= threshold) {
    return calculateEstimate(options);
  }
  return calculateExact(options);
};
