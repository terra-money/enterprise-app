import { Environment } from 'utils';
import { EventCollector } from '@apps-shared/indexers/collectors';
import { EventStoreTableInitializer, StateTableInitializer } from '@apps-shared/indexers/initializers';
import { Runner } from '@apps-shared/indexers/indexers';
import {
  NetworkName,
  createDynamoDBClient,
  createEventStore,
  createLCDClient,
  createState,
  daoContractAddressRecord,
  fetchAll,
} from '@apps-shared/indexers/utils';
import { BlockListener } from '@apps-shared/indexers/services/block-listener';
import { Runnable } from '@apps-shared/indexers/services/runnable';
import { DaosTableInitializer, TableNames } from 'initializers';

const blockListener = new BlockListener({
  lcd: createLCDClient(),
});

const eventStore = createEventStore();

const state = createState('collector:enterprise-events');

const genesis = Environment.getGenesis();

const enterpriseFactoryAddress = daoContractAddressRecord['enterprise-factory'][process.env.NETWORK as NetworkName];

class EnterpriseEventCollector implements Runnable {
  private enterpriseAddresses: string[] = [];

  async initialize() {
    const dynamoDBClient = createDynamoDBClient();

    const response = await fetchAll<{ address: string }>(dynamoDBClient, {
      TableName: TableNames.daos(),
      IndexName: 'idx-dao-name',
      Limit: 100000,
      KeyConditionExpression: `#a = :a`,
      ExpressionAttributeNames: {
        '#a': '_type',
      },
      ExpressionAttributeValues: {
        ':a': { S: 'dao' },
      },
      ProjectionExpression: 'address',
    });

    this.enterpriseAddresses = [...this.enterpriseAddresses, ...response.map((a) => a.address)];
  }

  async run(): Promise<void> {
    await this.initialize();

    const eventCollector = new EventCollector({
      genesis,
      blockListener,
      monikers: (contractAddress: string) => {
        return contractAddress === enterpriseFactoryAddress
          ? 'enterprise-factory'
          : this.enterpriseAddresses.includes(contractAddress)
          ? 'enterprise'
          : undefined;
      },
      onEvent: (event) => {
        console.log('Detected event: ', event);
        if (event.contract === 'enterprise-factory' && event.action === 'instantiate_dao') {
          if (event.payload['dao_address']) {
            this.enterpriseAddresses.push(event.payload['dao_address']);
          }
        }
      },
      eventStore,
      state,
    });

    await eventCollector.run();
  }
}

const runnable = new EnterpriseEventCollector();

new Runner(runnable, new StateTableInitializer(), new EventStoreTableInitializer(), new DaosTableInitializer())
  .run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
