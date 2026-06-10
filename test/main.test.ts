import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { SchedulerStack } from '../src/stacks/SchedulerStack';

test('creates scheduler infrastructure', () => {
  const app = new App();

  const stack = new SchedulerStack(
    app,
    'test-stack',
  );

  const template = Template.fromStack(stack);

  template.resourceCountIs(
    'AWS::SQS::Queue',
    1,
  );

  template.resourceCountIs(
    'AWS::Lambda::Function',
    2,
  );

  template.resourceCountIs(
    'AWS::Events::Rule',
    1,
  );

  template.resourceCountIs(
    'AWS::SSM::Parameter',
    1,
  );
});