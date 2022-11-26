import { EventStore } from '@apps-shared/indexers/services/event-store';
import { DynamoDBPersistenceOptions, Persistence } from '@apps-shared/indexers/services/persistence';
import { Runnable } from '@apps-shared/indexers/services/runnable';
import { State } from '@apps-shared/indexers/services/state';
import { Epoch } from '@apps-shared/indexers/types';
import { createEventStore, createPersistence, createState, Logger, makeTableName } from '@apps-shared/indexers/utils';
import { Environment } from 'utils';

interface IndexerOptions<Entity>
  extends Pick<DynamoDBPersistenceOptions<Entity>, 'tableName' | 'pkName' | 'pk' | 'skName' | 'sk' | 'skName'> {
  name: string;
}

export interface IndexFnOptions {
  current: Epoch;
  genesis: Epoch;
}

export abstract class EventIndexer<Entity> implements Runnable {
  private readonly options: IndexerOptions<Entity>;

  protected readonly persistence: Persistence<Entity>;

  protected readonly state: State;

  protected readonly events: EventStore;

  readonly logger: Logger;

  constructor(options: IndexerOptions<Entity>) {
    this.options = options;

    this.logger = new Logger(options.name);

    this.persistence = createPersistence<Entity>(
      this.options.tableName ?? makeTableName(this.options.name),
      this.options.pk,
      this.options.sk,
      this.options.pkName,
      this.options.skName
    );

    this.state = createState(`indexer:enterprise-${this.options.name}`);

    this.events = createEventStore();
  }

  abstract index(options: IndexFnOptions): Promise<void>;

  private fetchCollectorEpoch = async (): Promise<Epoch> => {
    const state = createState('collector:enterprise-events');

    return await state.get(Environment.getGenesis());
  };

  run = async (): Promise<void> => {
    this.logger.info(`Running the ${this.options.name} indexer`);

    const current = await this.fetchCollectorEpoch();

    const genesis = Environment.getGenesis();

    await this.index({
      current,
      genesis,
    });
  };
}
