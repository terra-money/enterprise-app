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
    const { ids, tokens } = await lcd.wasm.contractQuery<NftIdsResponse>(collection, {
      tokens: { owner, start_after: startAfter },
    });

    if (!tokens || tokens.length === 0) {
      return ids || [];
    }

    const lastId = tokens[tokens.length - 1];
    const nextIds = await fetchNftIds(lastId);
    return [...(ids || []), ...nextIds];
  };

  const ids = await fetchNftIds();

  return ids
}