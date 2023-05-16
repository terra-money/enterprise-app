import { createLCDClient, Logger } from "@apps-shared/indexers/utils";
import { enterprise } from "types/contracts";
import Big from 'big.js';
import { Entity } from "./types";

interface GetProposalParams {
  daoAddress: string
  id: number
  logger: Logger
}

export const getProposalFromContract = async ({ daoAddress, id, logger }: GetProposalParams): Promise<Entity> => {
  const lcd = createLCDClient();

  logger.info(`Fetching proposal with id ${id} for ${daoAddress} DAO.`);

  const response = await lcd.wasm.contractQuery<enterprise.ProposalResponse>(daoAddress, {
    proposal: {
      proposal_id: id,
    },
  });

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
    proposer: response.proposal.proposer
  };
}