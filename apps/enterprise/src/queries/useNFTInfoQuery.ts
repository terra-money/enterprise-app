import { LCDClient } from '@terra-money/feather.js';
import { useLcdClient } from '@terra-money/wallet-kit';
import { useQuery, UseQueryResult } from 'react-query';

type Variables = {
  collectionAddr: string;
  tokenId: string;
};

type TokenIds = string[];
const createCollectionQuery = (vars: Variables) => {
  return `
  query MyQuery {
    tokensPage(collectionAddr:"${vars.collectionAddr}", tokenId: "${vars.tokenId}") {
      collection {
        collectionAddr
        collectionName
        collectionInfo
        traitsCount
      }
      token {
        name
        imageUrlFileserver
        market
        traits
        listing
        price
        denom
        marketListing
        rarity
        rank
        expiration
        status
        owner
        dealScore
        collectionAddr
        tokenId
      }
    }
  }
`;
};

const nftQuery = async (collectionAddr: string, tokenid: string, lcd: LCDClient) => {
  const queryData: any = await lcd.wasm.contractQuery(collectionAddr, {
    nft_info: { token_id: tokenid },
  });
  return queryData;
};

const fetchNFTData = async (collectionAddr: string, tokenId: string, lcd: LCDClient) => {
  const variables: Variables = {
    collectionAddr,
    tokenId,
  };
  const response = await fetch('https://nft-terra2.tfm.dev/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: createCollectionQuery(variables),
    }),
  });

  const json = await response.json();

  if (!json.data) {
    const queryData = await nftQuery(collectionAddr, tokenId, lcd);
    return queryData.extension;
  }

  return json;
};

async function fetchNFTDataForMultipleTokenIds(
  collectionAddr: string,
  tokenIds: TokenIds,
  lcd: LCDClient
): Promise<{ [tokenId: string]: any }> {
  const result: { [tokenId: string]: any } = {};

  for (const tokenId of tokenIds) {
    const data = await fetchNFTData(collectionAddr, tokenId, lcd);
    result[tokenId] = data;
  }

  return result;
}

export const useNFTInfoQuery = (
  collectionAddr: string,
  tokenIds: TokenIds
): UseQueryResult<{ [tokenId: string]: any }> => {
  const lcd = useLcdClient();
  return useQuery([collectionAddr, tokenIds], async () => {
    const data = await fetchNFTDataForMultipleTokenIds(collectionAddr, tokenIds, lcd);
    return data;
  });
};
