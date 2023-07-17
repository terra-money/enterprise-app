import { getAssetsInfo } from 'chain/utils/getAssetsInfo';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useNetworkName } from '../hooks/useNetworkName';

export const useAssetsInfoQuery = () => {
  const network = useNetworkName();

  return useQuery(QUERY_KEY.ASSETS_INFO, () => {
    return getAssetsInfo(network);
  });
};
