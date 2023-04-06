import { useQuery } from 'react-query';
import { QUERY_KEY } from 'queries';
import { useWallet } from '@terra-money/wallet-provider';
import { enterprise_factory } from 'types/contracts';
import { contractQuery } from '@terra-money/apps/queries';
import { useContractAddress } from '@terra-money/apps/hooks';

export const useEnterpriseCodeIdsQuery = () => {
  const { network } = useWallet();
  const address = useContractAddress('enterprise-factory');

  return useQuery(
    [QUERY_KEY.CODE_IDS],
    async () => {
      const { code_ids } = await contractQuery<
        enterprise_factory.QueryMsg,
        enterprise_factory.EnterpriseCodeIdsResponse
      >(network, address, { enterprise_code_ids: {} });

      return code_ids;
    },
    {
      refetchOnMount: false,
    }
  );
};

export const useEnterpriseLatestCodeIdQuery = () => {
  const { data, ...result } = useEnterpriseCodeIdsQuery()

  return {
    ...result,
    data: data ? Math.max(...data.map(Number)) : undefined
  }
};
