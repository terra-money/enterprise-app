import { EventIndexer, IndexFnOptions } from 'indexers/EventIndexer';
import { Entity } from './types';
import { LCDClient } from '@terra-money/feather.js';
import { TableNames, DAOS_PK_NAME, DAOS_SK_NAME } from 'initializers';
import { batch, createLCDClient } from '@apps-shared/indexers/utils';
import { KeySelector } from '@apps-shared/indexers/services/persistence';
import { fetchByHeight } from '@apps-shared/indexers/services/event-store';
import { EnterpriseEventPK, ExecuteProposalEvent, InstantiateDaoEvent } from 'types/events';
import { enterprise } from 'types/contracts';
import Big from 'big.js';

export const PK: KeySelector<Entity> = (data) => data.address;

export const SK = 'dao';

export class Indexer extends EventIndexer<Entity> {
  constructor() {
    super({
      name: 'daos',
      tableName: TableNames.daos(),
      pk: PK,
      pkName: DAOS_PK_NAME,
      sk: SK,
      skName: DAOS_SK_NAME,
    });
  }

  private getModifiedDAOAddresses = async (min: number, max: number): Promise<Array<string>> => {
    const pks = [
      EnterpriseEventPK.factory('instantiate_dao'),
      EnterpriseEventPK.dao('execute_proposal'),
      EnterpriseEventPK.dao('stake_cw20'),
      EnterpriseEventPK.dao('stake_cw721'),
      EnterpriseEventPK.dao('unstake_cw20'),
      EnterpriseEventPK.dao('unstake_cw721'),
    ];

    type Events = InstantiateDaoEvent | ExecuteProposalEvent;

    const promises = await Promise.all(
      pks.map((pk) => fetchByHeight<Events, string>(this.events, pk, min, max, (event) => [event.payload.dao_address]))
    );

    return Array.from(new Set<string>(promises.flatMap((s) => s))).filter(Boolean);
  };

  private fetchDAO = async (lcd: LCDClient, address: string): Promise<Entity> => {
    const response = await lcd.wasm.contractQuery<enterprise.DaoInfoResponse>(address, { dao_info: {} });

    const created = 'creation_date' in response ? Math.trunc(Big(response.creation_date).div(1000000).toNumber()) : 0;

    return {
      _type: 'dao',
      address,
      type: response.dao_type,
      name: response.metadata.name,
      description: response.metadata.description,
      lowerCaseName: response.metadata.name.toLowerCase(),
      logo: response.metadata.logo === 'none' ? undefined : response.metadata.logo.url,
      membershipContractAddress: response.dao_membership_contract,
      enterpriseFactoryContract: response.enterprise_factory_contract,
      created,
      codeVersionId: response.dao_code_version ?? '0',
      socials: {
        discord_username: response.metadata.socials.discord_username,
        github_username: response.metadata.socials.github_username,
        telegram_username: response.metadata.socials.telegram_username,
        twitter_username: response.metadata.socials.twitter_username,
      },
      council: response.dao_council,
      config: {
        quorum: Big(response.gov_config.quorum).toNumber(),
        threshold: Big(response.gov_config.threshold).toNumber(),
        vetoThreshold: Big(response.gov_config.veto_threshold ?? response.gov_config.threshold).toNumber(),
        unlockingPeriod: response.gov_config.unlocking_period,
        voteDuration: response.gov_config.vote_duration,
        minimumDeposit: response.gov_config.minimum_deposit,
      },
    };
  };

  private synchronize = async (addresses: string[]): Promise<void> => {
    const lcd = createLCDClient();

    const entities = [];

    for (let address of addresses) {
      entities.push(await this.fetchDAO(lcd, address));
    }

    await this.persistence.save(entities);
  };

  override index = async (options: IndexFnOptions): Promise<void> => {
    const { current, genesis } = options;

    let { height } = await this.state.get({ height: genesis.height });

    await batch(height, current.height, 1000, async ({ min, max }) => {
      this.logger.info(`Processing blocks between ${min} and ${max}.`);

      await this.synchronize(await this.getModifiedDAOAddresses(min, max));

      await this.state.set({ height: max });
    });
  };
}
