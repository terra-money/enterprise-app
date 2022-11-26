import {
  AttributeValue,
  BatchWriteItemCommand,
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { batch } from "@apps-shared/indexers/utils";
import { KeySelector, Persistence } from ".";

interface Marshallers<Entity> {
  marshall: (entity: Entity) => Record<string, AttributeValue>;
  unmarshall: (attributes: Record<string, AttributeValue>) => Entity;
}

export interface DynamoDBPersistenceOptions<TEntity> {
  tableName: string;
  pkName?: string;
  pk: string | KeySelector<TEntity>;
  skName?: string;
  sk?: string | KeySelector<TEntity>;
  marshallers?: Marshallers<TEntity>;
  dynamoClient: DynamoDBClient;
}

export interface DynamoAttributeDescriptor {
  [key: string]: AttributeValue;
}

export class DynamoDBPersistence<Entity> implements Persistence<Entity> {
  private readonly tableName: string;
  private readonly pkName: string = "pk";
  private readonly pk: string | KeySelector<Entity>;
  private readonly skName: string = "sk";
  private readonly sk?: string | KeySelector<Entity>;
  private readonly dynamoClient: DynamoDBClient;

  constructor(options: DynamoDBPersistenceOptions<Entity>) {
    Object.assign(this, options);
  }

  private mapKey = (entity: Entity) => {
    const pk = typeof this.pk === "function" ? this.pk(entity) : this.pk;
    const sk =
      typeof this.sk === "function"
        ? this.sk(entity)
        : typeof this.sk === "string"
        ? this.sk
        : undefined;
    return { [this.pkName]: pk, [this.skName]: sk };
  };

  private marshall = (entity: Entity): Record<string, AttributeValue> => {
    const options = { removeUndefinedValues: true };
    return {
      ...marshall(entity, options),
      ...marshall(this.mapKey(entity), options),
    };
  };

  private unmarshall = (attributes: Record<string, AttributeValue>): Entity => {
    //return omit(unmarshall(attributes), ["pk", "sk"]) as Entity;
    return unmarshall(attributes) as Entity;
  };

  save = async (entities: Entity[]): Promise<boolean> => {
    await batch(0, entities.length - 1, 25, async ({ min, max }) => {
      const params = {
        RequestItems: {
          [this.tableName]: [
            ...entities.slice(min, max + 1).map((entity) => {
              return {
                PutRequest: {
                  Item: this.marshall(entity),
                },
              };
            }),
          ],
        },
      };
      const response = await this.dynamoClient.send(
        new BatchWriteItemCommand(params)
      );
      if (Object.keys(response.UnprocessedItems).length > 0) {
        // TODO: should look and retrying these with an exponential backoff
        throw Error("Failed to save all items.");
      }
    });
    return true;
  };

  delete = async (entities: Entity[]): Promise<boolean> => {
    await batch(0, entities.length - 1, 25, async ({ min, max }) => {
      const params = {
        RequestItems: {
          [this.tableName]: [
            ...entities.slice(min, max + 1).map((entity) => {
              return {
                DeleteRequest: {
                  Key: marshall(this.mapKey(entity)),
                },
              };
            }),
          ],
        },
      };
      const response = await this.dynamoClient.send(
        new BatchWriteItemCommand(params)
      );
      if (Object.keys(response.UnprocessedItems).length > 0) {
        // TODO: should look and retrying these with an exponential backoff
        throw Error("Failed to delete all items.");
      }
    });
    return true;
  };

  get = async (
    pk: string,
    sk: string | number | Buffer
  ): Promise<Entity | undefined> => {
    const skAttributeValue: AttributeValue =
      sk instanceof Buffer
        ? { B: sk }
        : typeof sk === "string"
        ? { S: sk }
        : { N: sk.toString() };

    const response = await this.dynamoClient.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: {
          [this.pkName]: {
            S: pk,
          },
          [this.skName]: skAttributeValue,
        },
      })
    );
    return response.Item ? this.unmarshall(response.Item) : undefined;
  };
}
