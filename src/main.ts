import * as cdk from 'aws-cdk-lib';

import { SchedulerStack } from './stacks/SchedulerStack';

const app = new cdk.App();

new SchedulerStack(
  app,
  'MiniOfferSchedulerStack',
);