import { getLCDClient } from "./lcd";

interface GetNftIdsParams {
  collection: string
  owner: string
}

type NftIdsResponse = {
  ids?: string[];
  tokens?: string[];
};

export const getNftIds = async ({ collection, owner }: GetNftIdsParams) => {
  const lcd = getLCDClient()

  const fetchNftIds = async (startAfter?: string): Promise<string[]> => {
    const response = await lcd.wasm.contractQuery<NftIdsResponse>(collection, {
      tokens: { owner, start_after: startAfter },
    });

    const ids = response.ids ?? response.tokens ?? []

    if (!ids.length) {
      return [];
    }

    const lastId = ids[ids.length - 1];
    const nextIds = await fetchNftIds(lastId);
    return [...(ids || []), ...nextIds];
  };

  const ids = await fetchNftIds();

  return ids
}