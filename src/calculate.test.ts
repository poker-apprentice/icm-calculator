import { calculate } from './calculate';
import { calculateEstimate } from './calculateEstimate';
import { calculateExact } from './calculateExact';

jest.mock('./calculateEstimate', () => ({
  calculateEstimate: jest.fn(),
}));

jest.mock('./calculateExact', () => ({
  calculateExact: jest.fn(),
}));

describe('calculate', () => {
  const payouts = [10_000, 6_000, 4_000, 2_500, 1_750, 1_250, 1_000, 800, 600, 400, 200];
  const chipStacks = [123456, 234567, 345678, 456789, 567890, 678901, 789012, 890123, 901234];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('delegates to calculateExact when chipStacks size is below threshold', () => {
    const calculateExactMock = jest.mocked(calculateExact);
    calculate({ payouts, chipStacks, threshold: chipStacks.length + 1 });
    expect(calculateExactMock).toHaveBeenCalledTimes(1);
    expect(calculateExactMock).toHaveBeenCalledWith({ payouts, chipStacks });
  });

  it('delegates to calculateEstimate when chipStacks size is at threshold', () => {
    const calculateEstimateMock = jest.mocked(calculateEstimate);
    calculate({ payouts, chipStacks, threshold: chipStacks.length });
    expect(calculateEstimateMock).toHaveBeenCalledTimes(1);
    expect(calculateEstimateMock).toHaveBeenCalledWith({ payouts, chipStacks });
  });

  it('delegates to calculateEstimate when chipStacks size is above threshold', () => {
    const calculateEstimateMock = jest.mocked(calculateEstimate);
    calculate({ payouts, chipStacks, threshold: chipStacks.length - 1 });
    expect(calculateEstimateMock).toHaveBeenCalledTimes(1);
    expect(calculateEstimateMock).toHaveBeenCalledWith({ payouts, chipStacks });
  });
});
