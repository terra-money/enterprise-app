import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { TableInitializer } from "./TableInitializer";
import { TableNames } from "./TableNames";

export class EventStoreTableInitializer extends TableInitializer {
  constructor(tableName: string = TableNames.events()) {
    super({ tableName });
  }

  createTableDefinition(tableName: string): CreateTableCommandInput {
    return {
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: "pk",
          KeyType: "HASH",
        },
        {
          AttributeName: "sk",
          KeyType: "RANGE",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: "pk",
          AttributeType: "S",
        },
        {
          AttributeName: "sk",
          AttributeType: "B",
        },
        {
          AttributeName: "timestamp",
          AttributeType: "N",
        },
      ],
      LocalSecondaryIndexes: [
        {
          IndexName: "idx-timestamp",
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH",
            },
            {
              AttributeName: "timestamp",
              KeyType: "RANGE",
            },
          ],
          Projection: {
            ProjectionType: "ALL",
          },
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    };
  }
}
