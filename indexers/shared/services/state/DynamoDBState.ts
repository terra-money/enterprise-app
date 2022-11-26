import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { omit } from "lodash";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { State } from "./types";

interface DynamoDBStateOptions {
  keyName: string;
  tableName: string;
  dynamoClient: DynamoDBClient;
}

export class DynamoDBState implements State {
  private readonly keyName: string;
  private readonly tableName: string;
  private readonly dynamoClient: DynamoDBClient;

  constructor(options: DynamoDBStateOptions) {
    Object.assign(this, options);
  }

  private unmarshall = <Value>(
    attributes: Record<string, AttributeValue>
  ): Value => {
    return omit(unmarshall(attributes), ["pk"]) as Value;
  };

  async set<Value>(state: Value): Promise<void> {
    await this.dynamoClient.send(
      new PutItemCommand({
        TableName: this.tableName,
        Item: marshall({
          pk: this.keyName,
          timestamp: new Date().getTime(),
          ...state,
        }),
      })
    );
  }

  async get<Value>(defaultValue?: Value): Promise<Value> {
    const response = await this.dynamoClient.send(
      new GetItemCommand({
        TableName: this.tableName,
        Key: {
          pk: {
            S: this.keyName,
          },
        },
      })
    );
    return response.Item ? this.unmarshall(response.Item) : defaultValue;
  }
}
