import { calculateExact } from './calculateExact';

describe('calculateExact', () => {
  it('works for empty payouts', () => {
    const payouts: number[] = [];
    const chipStacks = [1_500_000, 1_250_000, 750_000, 225_000, 175_000];
    expect(calculateExact({ payouts, chipStacks })).toEqual([]);
  });

  it('works for empty chip stacks', () => {
    const payouts = [10_000, 5_000, 2_500];
    const chipStacks: number[] = [];
    expect(calculateExact({ payouts, chipStacks })).toEqual([]);
  });

  it('works for empty payouts and chip stacks', () => {
    const payouts: number[] = [];
    const chipStacks: number[] = [];
    expect(calculateExact({ payouts, chipStacks })).toEqual([]);
  });

  it('works for one player remaining', () => {
    const payouts = [10_000];
    const chipStacks = [1_500_000];
    expect(calculateExact({ payouts, chipStacks })).toEqual([10_000]);
  });

  it('works for one player remaining with extraneous payouts', () => {
    const payouts = [10_000, 5_000, 2_500];
    const chipStacks = [1_500_000];
    expect(calculateExact({ payouts, chipStacks })).toEqual([10_000]);
  });

  /*
   * Stacks: 1500, 1200
   * Payouts: 100, 76
   * Finish distribution
   *    Player 1	55.6%	44.4%
   *    Player 2	44.4%	55.6%
   * Prize distribution:
   *    Player 1	89.33
   *    Player 2	86.67
   */
  it('works for two payouts and two players', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1200];
    expect(calculateExact({ payouts, chipStacks })).toEqual([89.33, 86.67]);
  });

  /*
   * Stacks: 1500, 1200, 975
   * Payouts: 100, 76
   * Finish distribution
   *    Player 1	40.8%	34.5%	24.7%
   *    Player 2	32.7%	34.3%	33.0%
   *    Player 3	26.5%	31.2%	42.3%
   * Prize distribution:
   *    Player 1	67.06
   *    Player 2	58.73
   *    Player 3	50.21
   */
  it('works for two payouts and three players', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1200, 975];
    expect(calculateExact({ payouts, chipStacks })).toEqual([67.06, 58.73, 50.21]);
  });

  /*
   * Stacks: 1500, 1500, 975
   * Payouts: 100, 76
   * Finish distribution
   *    Player 1	37.7%	35.1%	27.1%
   *    Player 2	37.7%	35.1%	27.1%
   *    Player 3	24.5%	29.7%	45.7%
   * Prize distribution:
   *    Player 1	64.44
   *    Player 2	64.44
   *    Player 3	47.12
   */
  it('works for two payouts and three players with identical stacks', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1500, 975];
    expect(calculateExact({ payouts, chipStacks })).toEqual([64.44, 64.44, 47.12]);
  });

  /*
   * Stacks: 1500, 1200, 975, 350
   * Payouts: 100, 76
   * Finish distribution
   *    Player 1	37.3%	31.3%	22.9%	8.6%
   *    Player 2	29.8%	30.1%	27.4%	12.7%
   *    Player 3	24.2%	27.0%	31.2%	17.6%
   *    Player 4	8.7%	11.6%	18.5%	61.1%
   * Prize distribution:
   *    Player 1	61.05
   *    Player 2	52.68
   *    Player 3	44.73
   *    Player 4	17.54
   */
  it('works for two payouts and four players', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1200, 975, 350];
    expect(calculateExact({ payouts, chipStacks })).toEqual([61.05, 52.68, 44.73, 17.54]);
  });

  /*
   * Stacks: 1500, 1200, 975, 350, 275
   * Payouts: 100, 76
   * Finish distribution
   *    Player 1	34.9%	29.2%	21.7%	11.1%	3.0%
   *    Player 2	27.9%	27.5%	24.6%	15.0%	5.0%
   *    Player 3	22.7%	24.5%	26.4%	19.0%	7.5%
   *    Player 4	8.1%	10.5%	15.1%	29.9%	36.5%
   *    Player 5	6.4%	8.3%	12.3%	25.0%	48.0%
   * Prize distribution:
   *    Player 1	57.08
   *    Player 2	48.82
   *    Player 3	41.28
   *    Player 4	16.08
   *    Player 5	12.74
   */
  it('works for two payouts and five players', () => {
    const payouts = [100, 76];
    const chipStacks = [1500, 1200, 975, 350, 275];
    expect(calculateExact({ payouts, chipStacks })).toEqual([57.08, 48.82, 41.28, 16.08, 12.74]);
  });

  /*
   * Stacks: 150000, 98750, 45500
   * Payouts: 425, 280, 130
   * Finish distribution
   *    Player 1	51.0%	35.1%	13.9%
   *    Player 2	33.6%	41.0%	25.4%
   *    Player 3	15.5%	23.9%	60.6%
   * Prize distribution:
   *    Player 1	332.99
   *    Player 2	290.56
   *    Player 3	211.45
   */
  it('works for three payouts and three players', () => {
    const payouts = [425, 280, 130];
    const chipStacks = [150000, 98750, 45500];
    expect(calculateExact({ payouts, chipStacks })).toEqual([332.99, 290.56, 211.45]);
  });

  /*
   * Stacks: 150000, 98750, 45500, 13250
   * Payouts: 425, 280, 130, 75
   * Finish distribution
   *    Player 1	48.8%	33.7%	15.1%	2.4%
   *    Player 2	32.1%	37.6%	24.8%	5.5%
   *    Player 3	14.8%	21.8%	44.4%	19.1%
   *    Player 4	4.3%	6.9%	15.8%	73.0%
   * Prize distribution:
   *    Player 1	323.2
   *    Player 2	278.12
   *    Player 3	195.79
   *    Player 4	112.89
   */
  it('works for four payouts and four players', () => {
    const payouts = [425, 280, 130, 75];
    const chipStacks = [150000, 98750, 45500, 13250];
    expect(calculateExact({ payouts, chipStacks })).toEqual([323.2, 278.12, 195.79, 112.89]);
  });
});
