import { AttributeValue, ScanCommand } from "@aws-sdk/client-dynamodb";
import { RequestHandler } from "express";
import { parseQueryParameters } from "./parseQueryParameters";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { createDynamoDBClient } from "@apps-shared/indexers/utils";
import { TableNames } from "@apps-shared/indexers/initializers";

type Entity = {
  pk: string;
  timestamp: number;
  height: number;
};

const deserializeEntity = (
  attributes: Record<string, AttributeValue>
): Entity => {
  return unmarshall(attributes) as Entity;
};

const getState = async (): Promise<Entity[]> => {
  const dynamoDBClient = createDynamoDBClient();

  const response = await dynamoDBClient.send(
    new ScanCommand({
      TableName: TableNames.state(),
    })
  );

  return response.Items.map(deserializeEntity);
};

export const get: RequestHandler = async (request, response) => {
  const params = parseQueryParameters(request.query);

  switch (params.type) {
    case "state":
      const state = await getState();
      response.json(state);
      break;

    default:
      response.json({ status: "ok" });
      break;
  }
};
