import * as path from 'path';
import * as cdk from 'aws-cdk-lib';

import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import * as eventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as ssm from 'aws-cdk-lib/aws-ssm';

import { Construct } from 'constructs';

export class SchedulerStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    const queue = new sqs.Queue(
      this,
      'OfferSchedulerQueue',
      {
        visibilityTimeout:
          cdk.Duration.seconds(30),
      },
    );

    const configParameter =
      new ssm.StringParameter(
        this,
        'FacilityConfigParameter',
        {
          parameterName:
            '/scheduler/facility-config',

          stringValue: JSON.stringify({
            BOGOTA: {
              DELIVERY: '08:00',
              PICKUP: '09:00',
            },

            MEDELLIN: {
              DELIVERY: '10:00',
            },
          }),
        },
      );

    const schedulerLambda =
      new nodejs.NodejsFunction(
        this,
        'OfferSchedulerLambda',
        {
          runtime:
            lambda.Runtime.NODEJS_22_X,

          entry: path.join(
            __dirname,
            '../handlers/OfferScheduler/index.ts',
          ),

          handler: 'handler',

          environment: {
            QUEUE_URL:
              queue.queueUrl,
          },
        },
      );

    const consumerLambda =
      new nodejs.NodejsFunction(
        this,
        'OfferConsumerLambda',
        {
          runtime:
            lambda.Runtime.NODEJS_22_X,

          entry: path.join(
            __dirname,
            '../handlers/OfferConsumer/index.ts',
          ),

          handler: 'handler',
        },
      );

    queue.grantSendMessages(
      schedulerLambda,
    );

    queue.grantConsumeMessages(
      consumerLambda,
    );

    configParameter.grantRead(
      schedulerLambda,
    );

    consumerLambda.addEventSource(
      new eventSources.SqsEventSource(
        queue,
      ),
    );

    const rule =
      new events.Rule(
        this,
        'OfferSchedulerRule',
        {
          schedule:
            events.Schedule.rate(
              cdk.Duration.minutes(1),
            ),
        },
      );

    rule.addTarget(
      new targets.LambdaFunction(
        schedulerLambda,
      ),
    );
  }
}