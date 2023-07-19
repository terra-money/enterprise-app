import { useQuery } from 'react-query';
import { QUERY_KEY } from 'queries';
import { enterprise } from 'types/contracts';

import { MultisigMember } from 'types/MultisigMember';
import { useLcdClient } from '@terra-money/wallet-kit';

export const useMultisigMembersQuery = (contractAddress: string) => {
  const lcd = useLcdClient();

  return useQuery(
    [QUERY_KEY.MULTISIG_MEMBERS, contractAddress],
    async (): Promise<MultisigMember[]> => {
      const { members } = await lcd.wasm.contractQuery<enterprise.MultisigMembersResponse>(contractAddress, {
        list_multisig_members: {},
      });

      return members.map((member) => ({ addr: member.address, weight: Number(member.weight) }));
    },
    {
      refetchOnMount: false,
    }
  );
};
