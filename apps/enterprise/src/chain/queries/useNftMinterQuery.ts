import { useContract } from 'chain/hooks/useContract';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';

interface NftMinterParams {
  minter: {};
}

interface NftMinterResponse {
  minter: string;
}

export const useNftMinterQuery = (collectionAddr: string) => {
  const { query } = useContract();

  return useQuery([QUERY_KEY.NFT_MINTER, collectionAddr], async () => {
    const { minter } = await query<NftMinterParams, NftMinterResponse>(collectionAddr, {
      minter: {},
    });

    return minter;
  });
};
