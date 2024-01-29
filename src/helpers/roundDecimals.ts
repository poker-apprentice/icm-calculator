export const roundDecimals = (num: number, decimals: number) => {
  const multiplicand = Math.pow(10, decimals);
  const value = Math.round(num * multiplicand);
  return value / multiplicand;
};
