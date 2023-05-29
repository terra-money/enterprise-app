import { useQuery } from 'react-query';
import { QUERY_KEY } from 'queries';
import { enterprise } from 'types/contracts';
import { CW20Addr } from '@terra-money/apps/types';
import { MultisigMember } from 'types/MultisigMember';
import { useLCDClient } from '@terra-money/wallet-provider';

export const useMultisigMembersQuery = (contractAddress: CW20Addr) => {
  const lcd = useLCDClient();

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
