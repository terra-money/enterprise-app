import { TableNames } from '@enterprise/indexers/src/initializers';
import { fetchAll, scanAll } from '@apps-shared/api/utils';
import { DaoEntity } from '@enterprise/indexers/src/indexers/daos/types';
import { RequestHandler } from 'express';
import { parseQueryParameters } from './parseQueryParameters';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { DAO_IGNORE_PROPERTIES } from 'const';

const search = (params: ReturnType<typeof parseQueryParameters>): Promise<DaoEntity[]> => {
  const dynamoDBClient = createDynamoDBClient();

  if (params.query?.length > 0) {
    return scanAll<DaoEntity>(
      dynamoDBClient,
      {
        TableName: TableNames.daos(),
        IndexName: 'idx-dao-name',
        Limit: params.limit,
        FilterExpression: `#a = :a and contains(#b, :b)`,
        ExpressionAttributeNames: {
          '#a': '_type',
          '#b': 'lowerCaseName',
        },
        ExpressionAttributeValues: {
          ':a': { S: 'dao' },
          ':b': { S: params.query.toLowerCase() },
        },
      },
      DAO_IGNORE_PROPERTIES
    );
  }

  return fetchAll<DaoEntity>(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      IndexName: 'idx-proposal-created',
      ScanIndexForward: params.direction !== 'desc',
      Limit: params.limit,
      KeyConditionExpression: `#a = :a`,
      ExpressionAttributeNames: {
        '#a': '_type',
      },
      ExpressionAttributeValues: {
        ':a': { S: 'dao' },
      },
    },
    DAO_IGNORE_PROPERTIES
  );
};

export const get: RequestHandler = async (request, response): Promise<void> => {
  const params = parseQueryParameters(request.query);

  const daos = await search(params);

  if (daos !== undefined) {
    response.json(daos);
    return;
  }

  response.sendStatus(404);
};
