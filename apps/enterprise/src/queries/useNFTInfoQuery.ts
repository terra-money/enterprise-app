import { useQuery, UseQueryResult } from 'react-query';

const GET_COLLECTION = `
  query getCollection($collectionAddr: String!, $sorting: String!, $limit: Int!, $offset: Int!, $ASC: Boolean!, $sellNow: Boolean!, $withoutNullCount: Boolean!) {
    collection(collectionAddr: $collectionAddr, sorting: $sorting, limit: $limit, offset: $offset, ASC: $ASC, sellNow: $sellNow, withoutNullCount: $withoutNullCount) {
      collections {
        volume
        floorPrice
        traitsMap
      }
    }
  }
`;

export const fetchNFTInfo = async (collectionAddr: string): Promise<number> => {
  const variables = {
    collectionAddr,
    sorting: "volume",
    limit: 48,
    offset: 0,
    ASC: true,
    sellNow: true,
    withoutNullCount: false
  };
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_COLLECTION,
      variables: variables
    })
  });

  const json = await response.json();

  return json;
};

export const useNFTInfoQuery = (collectionAddr: string): UseQueryResult<number> => {


  return useQuery(
    [collectionAddr],
    () => {
      return fetchNFTInfo(collectionAddr);
    }
  );
};