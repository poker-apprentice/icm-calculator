import type { IdentifiableChipStack } from '~/types';

/**
 * Calculate the percentage from the rankings.
 *
 * Given:
 *   - 100 chips
 *   - 75 chips
 *   - 50 chips
 *
 * Example: for 2nd place with rankings [75],[50]
 *
 *     100*75         100*50
 *   -----------  +  -----------
 *   225(225-75)     225(225-50)
 *
 * Example: for 3nd place with rankings [75,50],[50,75]
 *
 *        100*75*50                   100*50*75
 *   ----------------------  +  ----------------------
 *   225(225-75)(225-75-50)     225(225-50)(225-50-75)
 *
 * @param chipStack the chip stack
 * @param totalChips the total number of chips in play
 * @param paths the rankings
 * @return the percentage for that place
 */
export const calculatePlacementProbability = (
  chipStack: IdentifiableChipStack,
  totalChips: number,
  paths: IdentifiableChipStack[][],
) => {
  if (paths.length == 0) {
    return chipStack.chips / totalChips;
  }
  let probability = 0;
  for (const path of paths) {
    let pathProbability = chipStack.chips / totalChips;
    let denominator = totalChips;
    for (const place of path) {
      denominator -= place.chips;
      pathProbability *= place.chips / denominator;
    }
    probability += pathProbability;
  }
  return probability;
};
