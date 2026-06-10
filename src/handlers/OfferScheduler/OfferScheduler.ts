import { sendMessage } from '../../adapters/aws/sqs';
import { getParameter } from '../../adapters/aws/ssm';
import { parseFacilityConfig } from '../../adapters/config';

import { computeDelay } from '../../logic/scheduling';

import {
  FacilitySchedule,
  SchedulerPayload,
} from '../../types';


export interface ScheduledMessage {
  payload: SchedulerPayload;
  delaySeconds: number;
}

export function buildScheduledMessages(
  schedules: FacilitySchedule[],
): ScheduledMessage[] {
  return schedules.map(
    (schedule, index) => ({
      payload: {
        facilityId: schedule.facilityId,
        serviceType: schedule.serviceType,
        scheduledAt: new Date().toISOString(),
      },
      delaySeconds: computeDelay(
        index,
        schedules.length,
      ),
    }),
  );
}


const FACILITY_CONFIG_PARAMETER =
  '/scheduler/facility-config';

export async function runOfferScheduler(): Promise<void> {
  const queueUrl =
    process.env.QUEUE_URL;

  if (!queueUrl) {
    throw new Error(
      'QUEUE_URL environment variable is required',
    );
  }

  const rawConfig =
    await getParameter(
      FACILITY_CONFIG_PARAMETER,
    );

  const schedules =
    parseFacilityConfig(
      JSON.parse(rawConfig),
    );

  const messages =
    buildScheduledMessages(
      schedules,
    );

  await Promise.all(
    messages.map((message) =>
      sendMessage(
        queueUrl,
        JSON.stringify(message.payload),
        message.delaySeconds,
      ),
    ),
  );
}
