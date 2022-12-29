import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useQueryNftInfo } from './useNftInfoQuery';

interface UseNftsQueryParams {
  collectionAddress: string;
  ids: string[];
}

export const useNftsQuery = ({ collectionAddress, ids }: UseNftsQueryParams) => {
  const queryNftInfo = useQueryNftInfo();

  return useQuery([QUERY_KEY.NFTS, collectionAddress, ...ids], async () => {
    return Promise.all(ids.map((token) => queryNftInfo(collectionAddress, token)));
  });
};
