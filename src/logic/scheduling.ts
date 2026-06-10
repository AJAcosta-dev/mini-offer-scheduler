const WINDOW_SECONDS = 7 * 60;

/**
 * Distributes messages across a fixed time window.
 */
export function computeDelay(
  index: number,
  total: number,
): number {
  if (total <= 1) {
    return 0;
  }

  const delayIncrement =
    WINDOW_SECONDS / total;

  return Math.floor(
    index * delayIncrement,
  );
}

/**
 * Returns true when the configured schedule time
 * has already passed today.
 */
export function shouldScheduleForTomorrow(
  scheduleTime: string,
  now: Date = new Date(),
): boolean {
  const [hours, minutes] =
    scheduleTime.split(':').map(Number);

  const scheduledDate = new Date(now);

  scheduledDate.setHours(
    hours,
    minutes,
    0,
    0,
  );

  return scheduledDate <= now;
}