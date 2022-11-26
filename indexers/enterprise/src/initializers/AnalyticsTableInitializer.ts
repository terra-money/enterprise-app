import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { TableInitializer } from '@apps-shared/indexers/initializers';
import { TableNames } from './TableNames';

export const PK_NAME = 'type';

export const SK_NAME = 'timestamp';

export class AnalyticsTableInitializer extends TableInitializer {
  constructor(tableName: string = TableNames.analytics()) {
    super({ tableName });
  }

  createTableDefinition(tableName: string): CreateTableCommandInput {
    return {
      TableName: tableName,
      KeySchema: [
        {
          AttributeName: PK_NAME,
          KeyType: 'HASH',
        },
        {
          AttributeName: SK_NAME,
          KeyType: 'RANGE',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: PK_NAME,
          AttributeType: 'S',
        },
        {
          AttributeName: SK_NAME,
          AttributeType: 'N',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      },
    };
  }
}
