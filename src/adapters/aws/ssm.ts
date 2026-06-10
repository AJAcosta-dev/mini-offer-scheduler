import {
  GetParameterCommand,
  SSMClient,
} from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient({});

export async function getParameter(
  parameterName: string,
): Promise<string> {
  const response =
      await ssmClient.send(
        new GetParameterCommand({
          Name: parameterName,
        }),
      );

  if (!response.Parameter?.Value) {
    throw new Error(
      `Parameter ${parameterName} not found`,
    );
  }

  return response.Parameter.Value;
}