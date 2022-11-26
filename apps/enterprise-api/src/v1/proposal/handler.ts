import { TableNames, DAOS_PK_NAME, DAOS_SK_NAME } from '@enterprise/indexers/src/initializers';
import { fetch, HttpError } from '@apps-shared/api/utils';
import { RequestHandler } from 'express';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { PROPOSAL_IGNORE_PROPERTIES } from 'const';

export const get: RequestHandler = async (request, response) => {
  const dynamoDBClient = createDynamoDBClient();

  const { address, id } = request.params;

  const proposal = await fetch(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      Key: {
        [DAOS_PK_NAME]: {
          S: address,
        },
        [DAOS_SK_NAME]: {
          S: `proposal:${id}`,
        },
      },
    },
    PROPOSAL_IGNORE_PROPERTIES
  );

  if (proposal !== undefined) {
    response.json(proposal);
    return;
  }

  throw HttpError.notFound();
};
