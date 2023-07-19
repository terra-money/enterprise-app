import { useQuery } from 'react-query';
import { QUERY_KEY } from 'queries';
import { enterprise_factory } from 'types/contracts';
import { useLcdClient } from '@terra-money/wallet-kit';
import { useContractAddress } from 'chain/hooks/useContractAddress';

export const useEnterpriseCodeIdsQuery = () => {
  const lcd = useLcdClient();
  const address = useContractAddress('enterprise-factory');

  return useQuery(
    [QUERY_KEY.CODE_IDS],
    async () => {
      const { code_ids } = await lcd.wasm.contractQuery<enterprise_factory.EnterpriseCodeIdsResponse>(address, {
        enterprise_code_ids: {},
      });

      return code_ids;
    },
    {
      refetchOnMount: false,
    }
  );
};

export const useEnterpriseLatestCodeIdQuery = () => {
  const { data, ...result } = useEnterpriseCodeIdsQuery();

  return {
    ...result,
    data: data ? Math.max(...data.map(Number)) : undefined,
  };
};
