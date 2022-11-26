import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import { deserializeEntity } from "./deserializeEntity";

export const fetchAll = async <Entity>(
  dynamoDBClient: DynamoDBClient,
  input: QueryCommandInput
): Promise<Entity[]> => {
  const entities = [];

  let response = await dynamoDBClient.send(
    new QueryCommand({
      ...input,
    })
  );

  entities.push(...response.Items.map<Entity>(deserializeEntity));

  while (response.LastEvaluatedKey) {
    // check if we have reached the limit as dynamo
    // will return the complete set via pagination
    if (input.Limit && entities.length >= input.Limit) {
      break;
    }

    response = await dynamoDBClient.send(
      new QueryCommand({
        ...input,
        ExclusiveStartKey: response.LastEvaluatedKey,
      })
    );

    entities.push(...response.Items.map<Entity>(deserializeEntity));
  }

  return entities;
};
