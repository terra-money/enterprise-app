import { contractQuery } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { NetworkInfo } from '@terra-money/wallet-provider';
import { enterprise } from 'types/contracts';

export const fetchProposalStatus = async (
  network: NetworkInfo,
  daoAddress: string,
  id: number
): Promise<enterprise.ProposalStatusResponse | undefined> => {
  const response = await contractQuery<enterprise.QueryMsg, enterprise.ProposalStatusResponse>(
    network,
    daoAddress as CW20Addr,
    {
      proposal_status: {
        proposal_id: id,
      },
    }
  );
  return response;
};
