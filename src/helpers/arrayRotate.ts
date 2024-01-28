export const arrayRotate = <T>(arr: T[], n: number) => {
  const distance = n % arr.length;
  return arr.slice(distance, arr.length).concat(arr.slice(0, distance));
};
