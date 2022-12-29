import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useContract } from 'chain/hooks/useContract';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useQueryNftInfo } from './useNftInfoQuery';

interface MyNftIdsParams {
  tokens: {
    owner: string;
  };
}

// some NFT contracts use ids, some use tokens
type MyNftIdsResponse = {
  ids?: string[];
  tokens?: string[];
};

export const useMyNftsQuery = (collectionAddr: string) => {
  const { query } = useContract();

  const queryNftInfo = useQueryNftInfo();

  const address = useAssertMyAddress();

  return useQuery([QUERY_KEY.MY_NFTS, collectionAddr], async () => {
    const { ids, tokens } = await query<MyNftIdsParams, MyNftIdsResponse>(collectionAddr, {
      tokens: { owner: address },
    });

    return Promise.all((ids || tokens || []).map((token) => queryNftInfo(collectionAddr, token)));
  });
};
