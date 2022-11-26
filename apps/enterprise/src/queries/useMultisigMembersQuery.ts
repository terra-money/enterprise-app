import { useQuery } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { enterprise } from 'types/contracts';
import { contractQuery } from '@terra-money/apps/queries';
import { CW20Addr } from '@terra-money/apps/types';
import { MultisigMember } from 'types/MultisigMember';

export const useMultisigMembersQuery = (contractAddress: CW20Addr) => {
  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.MULTISIG_MEMBERS, contractAddress],
    async (): Promise<MultisigMember[]> => {
      const { members } = await contractQuery<enterprise.QueryMsg, enterprise.MultisigMembersResponse>(
        network,
        contractAddress,
        { list_multisig_members: {} }
      );

      return members.map((member) => ({ addr: member.address, weight: Number(member.weight) }));
    },
    {
      refetchOnMount: false,
    }
  );
};
