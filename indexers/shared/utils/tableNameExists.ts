import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

export const tableNameExists = async (
  dynamoClient: DynamoDBClient,
  tableName: string,
  lastEvaluatedTableName: string = undefined
): Promise<boolean> => {
  const response = await dynamoClient.send(
    new ListTablesCommand({
      ExclusiveStartTableName: lastEvaluatedTableName,
      Limit: 100,
    })
  );

  return response.TableNames?.includes(tableName)
    ? true
    : response.LastEvaluatedTableName
    ? await tableNameExists(dynamoClient, tableName, response.LastEvaluatedTableName)
    : false;
};
