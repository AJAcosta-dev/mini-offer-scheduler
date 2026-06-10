import { SQSEvent } from 'aws-lambda';

import { processOffer } from './OfferConsumer';

export const handler = async (
  event: SQSEvent,
): Promise<void> => {
  for (const record of event.Records) {
    await processOffer(
      JSON.parse(record.body),
    );
  }
};