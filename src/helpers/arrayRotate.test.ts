import { arrayRotate } from './arrayRotate';

describe('arrayRotate', () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  it('rotates by one', () => {
    expect(arrayRotate(arr, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  });

  it('rotates by multiple', () => {
    expect(arrayRotate(arr, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
  });
});
