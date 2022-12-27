import { EventIndexer, IndexFnOptions } from 'indexers/EventIndexer';
import { Entity, ProposalKey } from './types';
import { LCDClient } from '@terra-money/terra.js';
import { TableNames, DAOS_PK_NAME, DAOS_SK_NAME } from 'initializers';
import { batch, createLCDClient } from '@apps-shared/indexers/utils';
import { KeySelector } from '@apps-shared/indexers/services/persistence';
import { fetchByHeight } from '@apps-shared/indexers/services/event-store';
import { DaoEvents, EnterpriseEventPK } from 'types/events';
import { enterprise } from 'types/contracts';
import Big from 'big.js';

export const PK: KeySelector<Entity> = (data) => data.daoAddress;

export const SK: KeySelector<Entity> = (data) => `proposal:${data.id}`;

export class Indexer extends EventIndexer<Entity> {
  constructor() {
    super({
      name: 'proposals',
      tableName: TableNames.daos(),
      pk: PK,
      pkName: DAOS_PK_NAME,
      sk: SK,
      skName: DAOS_SK_NAME,
    });
  }

  private getModifiedProposals = async (min: number, max: number): Promise<Array<ProposalKey>> => {
    this.logger.info(`Getting modified proposals between ${min} and ${max} blocks.`);

    const pks = [
      EnterpriseEventPK.dao('create_proposal'),
      EnterpriseEventPK.dao('execute_proposal'),
      EnterpriseEventPK.dao('cast_vote'),

      EnterpriseEventPK.dao('stake_cw20'),
      EnterpriseEventPK.dao('stake_cw721'),
      EnterpriseEventPK.dao('unstake_cw20'),
      EnterpriseEventPK.dao('unstake_cw721'),
    ];

    this.logger.info(`Fetching proposals with keys: ${pks}.`);

    const groupedProposals = await Promise.all(
      pks.map((pk) =>
        fetchByHeight<DaoEvents, string>(this.events, pk, min, max, (event) => [
          `${event.payload._contract_address}:${event.payload.proposal_id}`,
        ])
      )
    );

    const proposalsKeys: ProposalKey[] = [];

    Array.from(new Set<string>(groupedProposals.flatMap((s) => s)))
      .filter(Boolean)
      .forEach((stringifiedKey) => {
        const [daoAddress, stringifiedId] = stringifiedKey.split(':');
        const id = Number(stringifiedId);

        if (isNaN(id)) {
          this.logger.error(`Received invalid proposal id: ${stringifiedId} for ${daoAddress} DAO.`);
          return;
        }

        proposalsKeys.push({ daoAddress, id });
      });

    this.logger.info(`Received proposals keys: ${proposalsKeys}.`);

    return proposalsKeys;
  };

  private fetchProposal = async (lcd: LCDClient, daoAddress: string, id: number): Promise<Entity> => {
    this.logger.info(`Fetching proposal with id ${id} for ${daoAddress} DAO.`);

    const response = await lcd.wasm.contractQuery<enterprise.ProposalResponse>(daoAddress, {
      proposal: {
        proposal_id: id,
      },
    });

    this.logger.info(`Received proposal response: ${response}.`);

    const [yesVotes, noVotes, abstainVotes, vetoVotes] = response.results.reduce(
      (previous, [t, v]) => {
        previous[t] = v;
        return previous;
      },
      ['0', '0', '0', '0']
    );

    const created =
      'started_at' in response.proposal ? Math.trunc(Big(response.proposal.started_at).div(1000000).toNumber()) : 0;

    return {
      _type: 'proposal',
      daoAddress,
      id,
      created: created,
      started_at: created,
      title: response.proposal.title,
      description: response.proposal.description,
      expires: response.proposal.expires,
      status: response.proposal.status,
      proposalActions: response.proposal.proposal_actions,
      yesVotes,
      noVotes,
      abstainVotes,
      vetoVotes,
      totalVotes: response.total_votes_available,
    };
  };

  private synchronize = async (proposalsKeys: ProposalKey[]): Promise<void> => {
    const lcd = createLCDClient();

    const entities = [];

    await Promise.all(
      proposalsKeys.map(async ({ daoAddress, id }) => {
        try {
          const proposal = await this.fetchProposal(lcd, daoAddress, id);
          entities.push(proposal);
        } catch (err) {
          this.logger.error(`Failed to fetch proposal with id ${id} for ${daoAddress} DAO: ${err}.`);
        }
      })
    );

    await this.persistence.save(entities);
  };

  override index = async (options: IndexFnOptions): Promise<void> => {
    const { current, genesis } = options;

    let { height } = await this.state.get({ height: genesis.height });

    await batch(height, current.height, 1000, async ({ min, max }) => {
      this.logger.info(`Processing blocks between ${min} and ${max}.`);

      await this.synchronize(await this.getModifiedProposals(min, max));

      await this.state.set({ height: max });
    });
  };
}
