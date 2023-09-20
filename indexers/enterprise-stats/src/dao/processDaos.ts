import { projectionExpression } from 'db/projectionExpression';
import { Dao } from './Dao';
import { Key } from 'aws-sdk/clients/dynamodb';
import { getTableName } from 'db/tableName';
import { mergeParams } from 'db/mergeParams';
import { documentClient } from 'db';

interface ProcessDaosParams<T extends (keyof Dao)[]> {
  attributes: T;
  handle: (dao: Pick<Dao, T[number]>) => Promise<void>;
}

export async function processDaos<T extends (keyof Dao)[]>({ handle, attributes }: ProcessDaosParams<T>) {
  const recursiveScan = async (lastEvaluatedKey?: Key) => {
    const { Items, LastEvaluatedKey } = await documentClient
      .scan({
        TableName: getTableName('daos'),
        ExclusiveStartKey: lastEvaluatedKey,
        ...mergeParams(
          {
            ExpressionAttributeNames: {
              '#_type': '_type',
            },
            ExpressionAttributeValues: {
              ':_type': 'dao',
            },
            FilterExpression: '#_type = :_type',
          },
          projectionExpression(attributes)
        ),
      })
      .promise();

    const daos = Items as Pick<Dao, T[number]>[];

    await Promise.all(daos.map(handle));

    // for (const dao of daos) {
    //   await handle(dao);
    // }

    if (LastEvaluatedKey) {
      await recursiveScan(LastEvaluatedKey);
    }
  };

  recursiveScan();
}
