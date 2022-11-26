import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { TableInitializer } from "./TableInitializer";
import { TableNames } from "./TableNames";

export const PK_NAME = "pk";

export class StateTableInitializer extends TableInitializer {
  constructor(tableName: string = TableNames.state()) {
    super({ tableName });
  }

  createTableDefinition(tableName: string): CreateTableCommandInput {
    return {
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: PK_NAME,
          KeyType: "HASH",
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: PK_NAME,
          AttributeType: "S",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    };
  }
}
