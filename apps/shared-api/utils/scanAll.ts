import { DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { deserializeEntity } from './deserializeEntity';

export const scanAll = async <Entity>(
  dynamoDBClient: DynamoDBClient,
  input: ScanCommandInput,
  ignoreProperties: string[] = []
): Promise<Entity[]> => {
  const entities = [];

  let response = await dynamoDBClient.send(
    new ScanCommand({
      ...input,
    })
  );

  entities.push(...response.Items.map<Entity>((e) => deserializeEntity(e, ignoreProperties)));

  while (response.LastEvaluatedKey) {
    // check if we have reached the limit as dynamo
    // will return the complete set via pagination
    if (input.Limit && entities.length >= input.Limit) {
      break;
    }

    response = await dynamoDBClient.send(
      new ScanCommand({
        ...input,
        ExclusiveStartKey: response.LastEvaluatedKey,
      })
    );

    entities.push(...response.Items.map<Entity>((e) => deserializeEntity(e, ignoreProperties)));
  }

  return entities;
};
