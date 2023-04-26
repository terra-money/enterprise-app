import { DAOS_PK_NAME, DAOS_SK_NAME, TableNames } from '@enterprise/indexers/src/initializers';
import { fetchAll } from '@apps-shared/api/utils';
import { DaoEntity } from '@enterprise/indexers/src/indexers/daos/types';
import { RequestHandler } from 'express';
import { parseQueryParameters } from './parseQueryParameters';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { PROPOSAL_IGNORE_PROPERTIES } from 'const';

export const get: RequestHandler = async (request, response): Promise<void> => {
  const params = parseQueryParameters(request.query);

  const { address } = request.params;

  const dynamoDBClient = createDynamoDBClient();

  const proposals = await fetchAll<DaoEntity>(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      Limit: params.limit,
      ScanIndexForward: params.direction !== 'desc',
      KeyConditions: {
        [DAOS_PK_NAME]: {
          AttributeValueList: [{ S: address }],
          ComparisonOperator: 'EQ',
        },
        [DAOS_SK_NAME]: {
          AttributeValueList: [{ S: 'proposal:' }],
          ComparisonOperator: 'BEGINS_WITH',
        },
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
