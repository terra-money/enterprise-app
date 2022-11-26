import { EventIndexer, IndexFnOptions } from 'indexers/EventIndexer';
import { TableNames, ANALYTICS_PK_NAME, ANALYTICS_SK_NAME } from 'initializers';
import { Entity } from './types';
import { KeySelector } from '@apps-shared/indexers/services/persistence';

export const PK: KeySelector<Entity> = (data) => data.type;

export const SK: KeySelector<Entity> = (data) => data.timestamp;

export class Indexer extends EventIndexer<Entity> {
  constructor() {
    super({
      name: 'analytics',
      tableName: TableNames.analytics(),
      pk: PK,
      sk: SK,
      pkName: ANALYTICS_PK_NAME,
      skName: ANALYTICS_SK_NAME,
    });
  }

  override index = async (options: IndexFnOptions): Promise<void> => {
    const { current, genesis } = options;

    //let { height } = await this.state.get({ height: genesis.height });

    await this.state.set({ height: current.height });
  };
}
