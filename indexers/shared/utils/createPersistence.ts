import {
  DynamoDBPersistence,
  KeySelector,
  Persistence,
} from "services/persistence";
import { createDynamoDBClient } from "./createDynamoDBClient";

export const createPersistence = <Entity>(
  tableName: string,
  pk: string | KeySelector<Entity>,
  sk?: string | KeySelector<Entity>,
  pkName?: string,
  skName?: string
): Persistence<Entity> => {
  return new DynamoDBPersistence<Entity>({
    tableName,
    pkName,
    pk,
    skName,
    sk,
    dynamoClient: createDynamoDBClient(),
  });
};
