import { useContract } from 'chain/hooks/useContract';
import { getDistributedImageUrl } from 'chain/utils/getDistributedImageUrl';
import { QUERY_KEY } from 'queries';
import { useCallback } from 'react';
import { useQuery } from 'react-query';

export interface NftInfo {
  image?: string;
  name?: string;
  collectionAddr: string;
  tokenId: string;
}

export interface NftInfoQueryParams {
  address: string;
  id: string;
  enabled?: boolean;
}

interface NftInfoParams {
  nft_info: {
    token_id: string;
  };
}

interface NftExtension {
  image?: string;
  name?: string;
}

interface NftInfoResponse {
  token_uri?: string;
  extension?: NftExtension;
}

export const useQueryNftInfo = () => {
  const { query } = useContract();

  return useCallback(
    async (collectionAddr: string, tokenId: string) => {
      const { extension } = await query<NftInfoParams, NftInfoResponse>(collectionAddr, {
        nft_info: {
          token_id: tokenId,
        },
      });

      const nftInfo: NftInfo = {
        collectionAddr,
        tokenId,
        image: extension?.image ? getDistributedImageUrl(extension.image) : undefined,
        name: extension?.name,
      };

      return nftInfo;
    },
    [query]
  );
};

export const useNftInfoQuery = ({ address, id, enabled = true }: NftInfoQueryParams) => {
  const queryNftInfo = useQueryNftInfo();

  return useQuery(
    QUERY_KEY.NFT_INFO,
    async () => {
      return queryNftInfo(address, id);
    },
    {
      enabled,
    }
  );
};
