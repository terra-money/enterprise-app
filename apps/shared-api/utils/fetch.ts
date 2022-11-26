import { DynamoDBClient, GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { deserializeEntity } from './deserializeEntity';

export const fetch = async <Entity>(
  dynamoDBClient: DynamoDBClient,
  input: GetItemCommandInput,
  ignoreProperties: string[] = []
): Promise<Entity> => {
  const response = await dynamoDBClient.send(
    new GetItemCommand({
      ...input,
    })
  );
  return response.Item ? deserializeEntity(response.Item, ignoreProperties) : undefined;
};
