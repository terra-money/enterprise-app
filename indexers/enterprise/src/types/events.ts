import { Event, EventPK as PK } from '@apps-shared/indexers/services/event-store';

export type EnterpriseFactoryActions = 'instantiate_dao';

export type EnterpriseDaoActions =
  | 'instantiate'
  | 'create_proposal'
  | 'execute_proposal'
  | 'cast_vote'
  | 'stake_cw20'
  | 'stake_cw721'
  | 'unstake_cw20'
  | 'unstake_cw721';

export class EnterpriseEventPK {
  static from(contract: string, action: string): PK {
    return {
      contract,
      action,
    };
  }

  static factory(action: EnterpriseFactoryActions): PK {
    return EnterpriseEventPK.from('enterprise-factory', action);
  }

  static dao(action: EnterpriseDaoActions): PK {
    return EnterpriseEventPK.from('enterprise', action);
  }
}

export interface InstantiateDaoEvent extends Event {
  contract: 'enterprise-factory';
  action: 'instantiate_dao';
  payload: {
    _contract_address: string;
    action: string;
    dao_address: string;
  };
}

export interface CreateProposalEvent extends Event {
  contract: 'enterprise';
  action: 'create_proposal';
  payload: {
    _contract_address: string;
    action: string;
    dao_address: string;
    proposal_id: string;
  };
}

export interface ExecuteProposalEvent extends Event {
  contract: 'enterprise';
  action: 'execute_proposal';
  payload: {
    _contract_address: string;
    action: string;
    dao_address: string;
    proposal_id: string;
  };
}

export interface CastVoteEvent extends Event {
  contract: 'enterprise';
  action: 'cast_vote';
  payload: {
    _contract_address: string;
    action: string;
    dao_address: string;
    proposal_id: string;
    voter: string;
    outcome: string;
    amount: string;
  };
}

export type FactoryEvents = InstantiateDaoEvent;

export type DaoEvents = CreateProposalEvent | ExecuteProposalEvent | CastVoteEvent;

export type EnterpriseEvents = FactoryEvents | DaoEvents;
