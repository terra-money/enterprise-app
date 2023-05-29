import { useContractInfoQuery } from 'queries/useContractInfoQuery';
import { useEnterpriseLatestCodeIdQuery } from 'queries/useEnterpriseCodeIdsQuery';

export const useIsOldDaoVersionQuery = (address: string) => {
  const { data: contractInfo } = useContractInfoQuery(address);

  const { data: latestCodeId } = useEnterpriseLatestCodeIdQuery();

  return {
    data: !contractInfo || !latestCodeId ? undefined : latestCodeId !== contractInfo.code_id,
  };
};
