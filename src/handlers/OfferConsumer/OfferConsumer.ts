import { SchedulerPayload } from '../../types';

export async function processOffer(
  payload: SchedulerPayload,
): Promise<void> {
  console.log(
    'Processing offer:',
    JSON.stringify(payload, null, 2),
  );
}