import {
  computeDelay,
  shouldScheduleForTomorrow,
} from './scheduling';

describe('computeDelay', () => {
  test('returns 0 when there is only one message', () => {
    expect(computeDelay(0, 1)).toBe(0);
  });

  test('distributes delays across the window', () => {
    expect(computeDelay(0, 5)).toBe(0);
    expect(computeDelay(1, 5)).toBe(84);
    expect(computeDelay(2, 5)).toBe(168);
    expect(computeDelay(3, 5)).toBe(252);
    expect(computeDelay(4, 5)).toBe(336);
  });
});

describe('shouldScheduleForTomorrow', () => {
  test('returns true when time already passed', () => {
    const now = new Date('2026-06-05T15:00:00');

    expect(
      shouldScheduleForTomorrow(
        '08:00',
        now,
      ),
    ).toBe(true);
  });

  test('returns false when time has not passed', () => {
    const now = new Date('2026-06-05T15:00:00');

    expect(
      shouldScheduleForTomorrow(
        '18:00',
        now,
      ),
    ).toBe(false);
  });
});