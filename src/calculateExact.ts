import sum from 'lodash/sum';
import { v4 as uuid } from 'uuid';
import { arrayRotate } from './helpers/arrayRotate';
import { calculatePlacementProbability } from './helpers/calculatePlacementProbability';
import { calculateRankings } from './helpers/calculateRankings';
import { roundDecimals } from './helpers/roundDecimals';
import type { CalculateOptions, IdentifiableChipStack, OmitStrict } from './types';

interface CalculateExactOptions extends OmitStrict<CalculateOptions, 'iterations' | 'threshold'> {}

// Figure out what percent each player gets by comparing chip stacks
const calculateProbabilities = (chipStacks: number[]): number[][] => {
  const totalChips = sum(chipStacks);

  // Add a unique identifier to differentiate between same sized stacks.
  let identifiableChipStacks: IdentifiableChipStack[] = chipStacks.map((chips) => ({
    id: uuid(),
    chips,
  }));

  const stackProbabilities = new Map<string, number[]>(
    identifiableChipStacks.map(({ id }) => [id, []]),
  );

  for (let stackIndex = 0; stackIndex < identifiableChipStacks.length; stackIndex += 1) {
    // The stackIds gets rotated so always take the first one
    const chipStack = identifiableChipStacks[0];

    // Go through the places. If there are 2 stacks then calculate
    // first and second place. If there are 3 stacks then calculate
    // first, second and third place. Et cetera.
    for (let place = 0; place < identifiableChipStacks.length; place += 1) {
      // The paths are all the permutations of the stacks for a given place (2nd, 3rd, ...)
      // which is needed for input for the Malmuth-Harville equation.
      const paths = calculateRankings(identifiableChipStacks, place);

      // Calculate the probability of coming in the place
      const placementProbability = calculatePlacementProbability(chipStack, totalChips, paths);

      // Store the probability
      stackProbabilities.get(chipStack.id)!.push(placementProbability);
    }

    // Rotate the stack to process the probabilities for the next stack
    identifiableChipStacks = arrayRotate(identifiableChipStacks, 1);
  }

  return Array.from(stackProbabilities.values());
};

const calculateAmounts = (payouts: number[], stackProbabilities: number[][]): number[] => {
  const icmAmounts: number[] = [];

  for (const probabilities of stackProbabilities) {
    let sum = 0;
    for (let i = 0; i < payouts.length; i++) {
      const amount = payouts[i];
      const probability = probabilities[i];
      sum += amount * probability;
    }
    icmAmounts.push(roundDecimals(sum, 2));
  }

  return icmAmounts;
};

export const calculateExact = ({ payouts, chipStacks }: CalculateExactOptions): number[] => {
  if (payouts.length === 0 || chipStacks.length === 0) {
    return [];
  }

  // Sort the payouts highest to lowest, limited to the number of players remaining.
  payouts = [...payouts].sort((a, b) => b - a).slice(0, chipStacks.length);

  // Calculate the probabilities of each player coming in first place, second place, etc.
  const stackProbabilities = calculateProbabilities(chipStacks);

  // Apply the probabilities to the amounts.
  return calculateAmounts(payouts, stackProbabilities);
};
