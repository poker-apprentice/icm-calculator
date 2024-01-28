import isEqual from 'lodash/isEqual';
import type { IdentifiableChipStack } from '~/types';
import { getPermutations } from './getPermutations';

/**
 * Figure out the order of the stacks that will be needed later for the summations.
 * For example if there are three stacks:
 *
 *   - 100 chips
 *   - 75 chips
 *   - 50 chips
 *
 * Then the order needed when applying the summations (the other method in the class).
 *
 * Example: for chip stack 100: for 2nd place would be:
 *
 *     100*75         100*50
 *   -----------  +  -----------
 *   225(225-75)     225(225-50)
 *
 * So the rankings would be [75],[50].
 *
 * Example: for the chip stack 100: for 3nd place would be:
 *
 *        100*75*50                   100*50*75
 *   ----------------------  +  ----------------------
 *   225(225-75)(225-75-50)     225(225-50)(225-50-75)
 *
 * So the rankings would be [75,50],[50,75].
 *
 * @param chipStacks the identifiable chip stacks
 * @param depth how deep to go (the place in the examples above)
 * @return a list of lists of rankings (see examples above)
 */
export const calculateRankings = (
  chipStacks: IdentifiableChipStack[],
  depth: number,
): IdentifiableChipStack[][] => {
  if (depth == 0) {
    return [];
  }

  // All the possible ways to arrange the other stacks
  const allOtherStackIds = new Array<IdentifiableChipStack>(chipStacks.length - 1);
  for (let i = 1; i < chipStacks.length; i += 1) {
    allOtherStackIds[i - 1] = chipStacks[i];
  }
  const permutations: IdentifiableChipStack[][] = getPermutations(allOtherStackIds);

  const paths: IdentifiableChipStack[][] = [];

  // Keep the non-duplicates up to the depth
  for (const permutation of permutations) {
    // Trim the list to the depth
    let trimmedList: IdentifiableChipStack[] = permutation;
    if (permutation.length > depth) {
      trimmedList = permutation.slice(0, depth);
    }

    const exists = paths.findIndex((path) => isEqual(path, trimmedList)) !== -1;
    if (!exists) {
      paths.push(trimmedList);
    }
  }

  return paths;
};
