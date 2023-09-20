import axios from 'axios';
import { sleep } from 'shared/sleep';

interface PulsarTimeseriesResponse {
  wallet: { address: string; chain: string };
  tier: string;
  timeseries: Record<string, number>;
  events: Record<string, unknown>;
  stats: { current_networth: number; networth_difference: number; percentage_difference: number };
}

// Pulsar public API is at https://api.pulsar.finance/v1
// TFL Proxy for Pulsar is at https://pulsar-proxy.tfl.workers.dev
const pulsarBaseUrl = 'https://pulsar-proxy.tfl.workers.dev';

const msInSec = 1000;

let disableRequestsUntil: undefined | number = undefined;
const queryPulsar = async <T>(params: string): Promise<T> => {
  const now = Date.now();
  if (disableRequestsUntil && now < disableRequestsUntil) {
    await sleep(disableRequestsUntil - now);

    return queryPulsar(params);
  }

  const queryUlr = `${pulsarBaseUrl}/${params}`;

  try {
    const response = await axios.get<T>(queryUlr);
    return response.data;
  } catch (err) {
    const retryMightHelp = [429, 500, 503, 504].includes(err.response.status);
    if (retryMightHelp) {
      disableRequestsUntil = Date.now() + msInSec * 5;

      return queryPulsar(params);
    }

    throw err;
  }
};

export const getTimeseries = async (address: string): Promise<PulsarTimeseriesResponse> => {
  return queryPulsar<PulsarTimeseriesResponse>(`wallet/${address}/timeseries?chain=TERRA2&tier=1d`);
};
