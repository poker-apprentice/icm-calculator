export interface CalculateOptions {
  /** The list of outstanding payouts that will be awarded to players. */
  payouts: number[];
  /** The list of chip stacks for each of the remaining players. */
  chipStacks: number[];
  /** The threshold used to determine whether an exact or estimated calculation should be performed. */
  threshold?: number;
  /** The number of iterations to use per player when estimated calculations are performed. */
  iterations?: number;
}

export interface IdentifiableChipStack {
  id: string;
  chips: number;
}

export type OmitStrict<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>;
