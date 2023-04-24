import { useAssertMyAddress } from 'chain/hooks/useAssertMyAddress';
import { useContract } from 'chain/hooks/useContract';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useQueryNftInfo } from './useNftInfoQuery';

interface MyNftIdsParams {
  tokens: {
    owner: string;
    start_after?: string;
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

  const fetchNftIds = async (startAfter?: string): Promise<string[]> => {
    const { ids, tokens } = await query<MyNftIdsParams, MyNftIdsResponse>(collectionAddr, {
      tokens: { owner: address, start_after: startAfter },
    });

    if (!tokens || tokens.length === 0) {
      return ids || [];
    }

    const lastId = tokens[tokens.length - 1];
    const nextIds = await fetchNftIds(lastId);
    return [...(ids || []), ...nextIds];
  };

  return useQuery([QUERY_KEY.MY_NFTS, collectionAddr], async () => {
    const allIds = await fetchNftIds();

    return Promise.all(allIds.map((token) => queryNftInfo(collectionAddr, token)));
  });
};

