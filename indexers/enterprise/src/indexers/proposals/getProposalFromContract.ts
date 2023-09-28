import { createLCDClient, daoContractAddressRecord, Logger, NetworkName } from '@apps-shared/indexers/utils';
import Big from 'big.js';
import { Entity } from './types';
import { QueryMsg, ProposalResponse } from 'types/enterprise_facade';

interface GetProposalParams {
  daoAddress: string;
  id: number;
  logger: Logger;
}

const enterpriseFacadeAddress = daoContractAddressRecord['enterprise-facade'][process.env.NETWORK as NetworkName];

export const getProposalFromContract = async ({ daoAddress, id, logger }: GetProposalParams): Promise<Entity> => {
  const lcd = createLCDClient();

  logger.info(`Fetching proposal with id ${id} for ${daoAddress} DAO.`);

  const msg: QueryMsg = {
    proposal: {
      contract: daoAddress,
      params: {
        proposal_id: id,
      },
    },
  };

  const response = await lcd.wasm.contractQuery<ProposalResponse>(enterpriseFacadeAddress, msg);

  logger.info(`Received proposal response: ${response}.`);

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
    type: response.proposal.proposal_type,
    proposer: response.proposal.proposer,
  };
};
