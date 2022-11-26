import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const createDynamoDBClient = (): DynamoDBClient => {
  // we don't need to set any of this for an aws service it has a region and a role already
  // the aws sdk already knows to look for the default env vars
  if (process.env.USE_DEFAULT_CRED_PROVIDER === "true") {
    return new DynamoDBClient({ region: process.env.AWS_REGION });
  }
  const configuration = {
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  return new DynamoDBClient(configuration);
};
