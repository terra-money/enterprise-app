import {
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import { createDynamoDBClient, tableNameExists } from "utils";
import { Initializer } from "./Initializer";
import { Logger } from "utils";

interface TableInitializerOptions {
  tableName: string;
}

export abstract class TableInitializer extends Initializer {
  private readonly tableName: string;
  private readonly logger: Logger;

  constructor(options: TableInitializerOptions) {
    super();
    this.tableName = options.tableName;
    this.logger = new Logger("TableInitializer");
  }

  protected abstract createTableDefinition(
    tableName: string
  ): CreateTableCommandInput;

  private async initializeTable(
    tableName: string,
    dynamoClient: DynamoDBClient
  ): Promise<void> {
    this.logger.info(
      `Attempting to find existing table '${tableName}' in dynamodb`
    );
    if ((await tableNameExists(dynamoClient, tableName)) === false) {
      this.logger.info(`Attempting to create table '${tableName}' in dynamodb`);
      await dynamoClient.send(
        new CreateTableCommand(this.createTableDefinition(tableName))
      );
    }
  }

  async initialize(): Promise<void> {
    const dynamoClient = createDynamoDBClient();

    return this.initializeTable(this.tableName, dynamoClient);
  }
}
