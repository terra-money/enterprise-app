import { useQuery, UseQueryResult } from 'react-query';
import { enterprise } from 'types/contracts';

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

const fetchNFTData = async (collectionAddr: string, tokenId: string): Promise<enterprise.NftCollection[]> => {
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

  return json;
};

async function fetchNFTDataForMultipleTokenIds(
  collectionAddr: string,
  tokenIds: TokenIds
): Promise<{ [tokenId: string]: any }> {
  const result: { [tokenId: string]: any } = {};

  for (const tokenId of tokenIds) {
    const data = await fetchNFTData(collectionAddr, tokenId);
    result[tokenId] = data;
  }

  return result;
}

export const useNFTInfoQuery = (
  collectionAddr: string,
  tokenIds: TokenIds
): UseQueryResult<{ [tokenId: string]: enterprise.NftCollection }> => {
  return useQuery([collectionAddr, tokenIds], async () => {
    const data = await fetchNFTDataForMultipleTokenIds(collectionAddr, tokenIds);
    return data;
  });
};
