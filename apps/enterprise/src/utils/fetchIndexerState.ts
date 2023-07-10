import { NetworkName } from 'chain/hooks/useNetworkName';
import { createApiEndpoint } from 'hooks';

interface StateEntry {
  pk: string;
  height: number;
}

export const fetchIndexerState = async (networkName: NetworkName): Promise<StateEntry[]> => {
  const endpoint = createApiEndpoint(networkName, {
    path: 'v1/health-check',
    params: { type: 'state' },
  });

  try {
    const response = await fetch(endpoint);

    return (await response.json()) as StateEntry[];
  } catch (err) {
    return [];
  }
};
