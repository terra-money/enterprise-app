import { TableNames } from "initializers";
import { DynamoDBEventStore, EventStore } from "../services/event-store";
import { createDynamoDBClient } from "./createDynamoDBClient";

export const createEventStore = (
  tableName: string = TableNames.events()
): EventStore => {
  return new DynamoDBEventStore({
    tableName,
    dynamoClient: createDynamoDBClient(),
  });
};
