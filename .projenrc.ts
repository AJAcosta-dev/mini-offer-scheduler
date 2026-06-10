import { awscdk, javascript } from 'projen';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.189.1',

  defaultReleaseBranch: 'main',

  name: 'mini-offer-scheduler',

  packageManager:
    javascript.NodePackageManager.NPM,

  projenrcTs: true,

  deps: [
    '@aws-sdk/client-sqs',
    '@aws-sdk/client-ssm',
    '@types/aws-lambda',
  ],
});

project.synth();