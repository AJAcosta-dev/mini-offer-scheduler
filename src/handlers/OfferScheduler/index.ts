import {
  runOfferScheduler,
} from './OfferScheduler';

export const handler = async (): Promise<void> => {
  await runOfferScheduler();
};

