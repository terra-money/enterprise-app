import { Nft } from "chain/Nft";
import { QueryContract } from "chain/hooks/useContract";
import { fetchAll } from "lib/shared/utils/fetchAll";
import { getLast } from "lib/shared/utils/getlast";

interface GetNftsParams {
  collection: string
  owner: string
  query: QueryContract
}

type NftIdsResponse = {
  ids?: string[];
  tokens?: string[];
};

interface NftsQuery {
  tokens: {
    owner: string
    start_after?: string
    limit?: number
  }
}

export const getNfts = async ({ collection, owner, query }: GetNftsParams) => {
  const ids = await fetchAll<string, string>(
    async (start_after) => {
      const response = await query<NftsQuery, NftIdsResponse>(collection, {
        tokens: { owner, start_after, limit: 100 },
      });

      return response.ids || response.tokens || []
    },
    (lastPage) => getLast(lastPage) || null
  );

  return ids.map<Nft>((id) => ({
    collection,
    id
  }));
}