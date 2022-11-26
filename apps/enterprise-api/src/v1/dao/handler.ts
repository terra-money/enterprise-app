import { TableNames, DAOS_PK_NAME, DAOS_SK_NAME } from '@enterprise/indexers/src/initializers';
import { fetch, HttpError } from '@apps-shared/api/utils';
import { RequestHandler } from 'express';
import { createDynamoDBClient } from '@apps-shared/indexers/utils';
import { DAO_IGNORE_PROPERTIES } from 'const';

export const get: RequestHandler = async (request, response) => {
  const dynamoDBClient = createDynamoDBClient();

  const { address } = request.params;

  const dao = await fetch(
    dynamoDBClient,
    {
      TableName: TableNames.daos(),
      Key: {
        [DAOS_PK_NAME]: {
          S: address,
        },
        [DAOS_SK_NAME]: {
          S: 'dao',
        },
      },
    },
    DAO_IGNORE_PROPERTIES
  );

  if (dao !== undefined) {
    response.json(dao);
    return;
  }

  throw HttpError.notFound();
};
