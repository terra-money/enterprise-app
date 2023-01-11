import { AttributeValue, BatchWriteItemCommand, DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { omit } from 'lodash';
import { Timestamp } from 'types';
import { batch } from 'utils';
import { Event, EventStore, EventPK, EventSK, QueryOptions, QueryResponse } from './types';

interface DynamoDBEventStoreOptions {
  tableName: string;
  timestampIndexName: string;
  dynamoClient: DynamoDBClient;
}

const SK_LENGTH = 4 + 2 + 2 + 32;

const DEFAULT_LIMIT = 100;

export class DynamoDBEventStore implements EventStore {
  private readonly dynamoClient: DynamoDBClient;
  private readonly tableName: string;
  private readonly timestampIndexName = 'idx-timestamp';

  constructor(options: Partial<DynamoDBEventStoreOptions>) {
    Object.assign(this, options);
  }

  private compressTxHash = (txHash: string, buffer: Buffer, offset: number) => {
    for (let i = 0, j = 0; i < txHash.length; i += offset, j++) {
      const v = parseInt(txHash.slice(i, i + offset), 16);
      buffer.writeUInt32BE(v, offset + j * 4);
    }
  };

  private decompressTxHash = (buffer: Buffer, offset: number, length: number = 32): string => {
    const parts = [];

    for (let i = 0; i < length; i += 4) {
      const v = buffer.readUInt32BE(offset + i);
      parts.push(v.toString(16));
    }

    return parts.join('');
  };

  private marshallSortingKey = (sk: EventSK): Buffer => {
    // the sorting key uses the height and the msg index to create a unique identifier for the
    // message, but using the height in the upper portion of the buffer means we can
    // perform range queries on the just the block
    const buffer = Buffer.alloc(SK_LENGTH);
    buffer.writeUInt32BE(sk.height, 0);
    buffer.writeUInt16BE(sk.msgIndex, 4);
    buffer.writeUInt16BE(sk.eventIndex, 6);

    this.compressTxHash(sk.txHash, buffer, 8);

    return buffer;
  };

  private unmarshallSortingKey = (sk: Buffer): EventSK => {
    return {
      height: sk.readUInt32BE(0),
      msgIndex: sk.readUInt16BE(4),
      eventIndex: sk.readUInt16BE(6),
      txHash: this.decompressTxHash(sk, 8),
    };
  };

  private marshall = (event: Event): Record<string, AttributeValue> => {
    // these attributes are stored in the keys and can be rehydrated
    const properties: Array<keyof Event> = ['contract', 'action', 'msgIndex', 'eventIndex'];
    return marshall({
      ...omit(event, properties),
      pk: `${event.contract}/${event.action}`,
      sk: this.marshallSortingKey(event),
    });
  };

  private unmarshall = <TEvent extends Event>(attributes: Record<string, AttributeValue>): TEvent => {
    const [contract, action] = attributes['pk'].S.split('/');

    return {
      ...omit(unmarshall(attributes), ['pk', 'sk']),
      ...this.unmarshallSortingKey(Buffer.from(attributes['sk'].B)),
      contract,
      action,
    } as TEvent;
  };

  async save(events: Array<Event>): Promise<void> {
    await batch(0, events.length - 1, 25, async ({ min, max }) => {
      const params = {
        RequestItems: {
          [this.tableName]: [
            ...events.slice(min, max + 1).map((event) => {
              return {
                PutRequest: {
                  Item: this.marshall(event),
                },
              };
            }),
          ],
        },
      };
      const response = await this.dynamoClient.send(new BatchWriteItemCommand(params));
      if (Object.keys(response.UnprocessedItems).length > 0) {
        // TODO: should look and retrying these with an exponential backoff
        throw Error('Failed to save all items.');
      }
    });
  }

  private createHeightSortingKey(height: number): Buffer {
    const buffer = Buffer.alloc(SK_LENGTH);
    buffer.writeUInt32BE(height, 0);
    return buffer;
  }

  async getBetweenBlocks<TEvent extends Event>(
    pk: EventPK,
    from: number,
    to: number,
    options: QueryOptions = {}
  ): Promise<QueryResponse<TEvent>> {
    const { limit = DEFAULT_LIMIT, next, forward = true } = options;
    const response = await this.dynamoClient.send(
      new QueryCommand({
        TableName: this.tableName,
        Limit: limit,
        ExclusiveStartKey: next,
        ScanIndexForward: forward,
        KeyConditions: {
          pk: {
            AttributeValueList: [{ S: `${pk.contract}/${pk.action}` }],
            ComparisonOperator: 'EQ',
          },
          sk: {
            AttributeValueList: [
              { B: this.createHeightSortingKey(from) },
              // we incremement the end range key because the sorting key would
              // assure that nothing matches anyway given that the sorting key
              // here doesn't contain a txHash
              { B: this.createHeightSortingKey(to + 1) },
            ],
            ComparisonOperator: 'BETWEEN',
          },
        },
      })
    );
    return {
      events: response.Items.map(this.unmarshall<TEvent>),
      next: response.LastEvaluatedKey,
    };
  }

  async getBetweenTimeRange<TEvent extends Event>(
    pk: EventPK,
    from: Timestamp,
    to: Timestamp,
    options: QueryOptions = {}
  ): Promise<QueryResponse<TEvent>> {
    const { limit = DEFAULT_LIMIT, next, forward = true } = options;
    const response = await this.dynamoClient.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: this.timestampIndexName,
        Limit: limit,
        ExclusiveStartKey: next,
        ScanIndexForward: forward,
        KeyConditions: {
          pk: {
            AttributeValueList: [{ S: `${pk.contract}/${pk.action}` }],
            ComparisonOperator: 'EQ',
          },
          timestamp: {
            AttributeValueList: [{ N: `${from.toNumber()}` }, { N: `${to.toNumber()}` }],
            ComparisonOperator: 'BETWEEN',
          },
        },
      })
    );
    return {
      events: response.Items.map(this.unmarshall<TEvent>),
      next: response.LastEvaluatedKey,
    };
  }
}
