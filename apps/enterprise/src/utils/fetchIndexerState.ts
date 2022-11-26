import { NetworkInfo } from '@terra-money/wallet-provider';
import { createApiEndpoint } from 'hooks';

interface StateEntry {
  pk: string;
  height: number;
}

export const fetchIndexerState = async (network: NetworkInfo): Promise<StateEntry[]> => {
  const endpoint = createApiEndpoint(network.name, {
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
