import {
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({});

export async function sendMessage(
  queueUrl: string,
  body: string,
  delaySeconds: number,
): Promise<void> {
  await sqsClient.send(
    new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: body,
      DelaySeconds: delaySeconds,
    }),
  );
}