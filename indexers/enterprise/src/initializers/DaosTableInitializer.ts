import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { TableNames } from './TableNames';
import { TableInitializer } from '@apps-shared/indexers/initializers';

export const PK_NAME = 'pk';

export const SK_NAME = 'sk';

export class DaosTableInitializer extends TableInitializer {
  constructor(tableName: string = TableNames.daos()) {
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
          AttributeType: 'S',
        },
        {
          AttributeName: '_type',
          AttributeType: 'S',
        },
        {
          AttributeName: 'lowerCaseName',
          AttributeType: 'S',
        },
        {
          AttributeName: 'created',
          AttributeType: 'N',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'idx-dao-name',
          KeySchema: [
            {
              AttributeName: '_type',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'lowerCaseName',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 3,
            WriteCapacityUnits: 3,
          },
        },
        {
          IndexName: 'idx-proposal-created',
          KeySchema: [
            {
              AttributeName: '_type',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'created',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 3,
            WriteCapacityUnits: 3,
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
