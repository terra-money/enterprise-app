import { TableNames } from '@enterprise/indexers/src/initializers';
import { fetchAll } from '@apps-shared/api/utils';
import { DaoEntity } from '@enterprise/indexers/src/indexers/daos/types';
import { RequestHandler } from 'express';
import { parseQueryParameters } from './parseQueryParameters';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { PROPOSAL_IGNORE_PROPERTIES } from 'const';

export const get: RequestHandler = async (request, response): Promise<void> => {
  const params = parseQueryParameters(request.query);

  const dynamoDBClient = createDynamoDBClient();

  const proposals = await fetchAll<DaoEntity>(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      IndexName: 'idx-proposal-created',
      ScanIndexForward: params.direction !== 'desc',
      Limit: params.limit,
      KeyConditionExpression: `#a = :b`,
      ExpressionAttributeNames: {
        '#a': '_type',
      },
      ExpressionAttributeValues: {
        ':b': { S: 'proposal' },
      },
    },
    PROPOSAL_IGNORE_PROPERTIES
  );

  if (proposals !== undefined) {
    response.json(proposals);
    return;
  }

  response.sendStatus(404);
};
