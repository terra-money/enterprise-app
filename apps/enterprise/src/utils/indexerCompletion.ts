import { TX_KEY } from 'tx';
import { fetchIndexerState } from './fetchIndexerState';
import { min } from 'd3-array';
import { NetworkName } from 'chain/hooks/useNetworkName';
import { sleep } from 'chain/transactions/utils/sleep';

interface IndexerCompletionOptions {
  networkName: NetworkName;
  height: number;
  timeout?: number;
  txKey: TX_KEY;
  callback: () => void;
}

const INDEXER_KEYS = ['indexer:enterprise-daos', 'indexer:enterprise-proposals'];

export const indexerCompletion = async (options: IndexerCompletionOptions): Promise<void> => {
  const { networkName, height, timeout = 10000, callback } = options;

  const now = Date.now();

  while (Date.now() < now + timeout) {
    const state = await fetchIndexerState(networkName);

    // wait for all of the required indexers to process the block
    const minHeight = min(
      state.filter((s) => INDEXER_KEYS.includes(s.pk)),
      (v) => v.height
    );

    if (minHeight && minHeight >= height) {
      break;
    }

    await sleep(1000);
  }

  callback();
};
