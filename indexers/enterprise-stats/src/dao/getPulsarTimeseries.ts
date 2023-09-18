import axios from 'axios';

interface PulsarTimeseriesResponse {
  wallet: { address: string; chain: string };
  tier: string;
  timeseries: Record<string, number>;
  events: Record<string, unknown>;
  stats: { current_networth: number; networth_difference: number; percentage_difference: number };
}

const pulsarBaseUrl = 'https://api.pulsar.finance/v1';
// const pulsarBaseUrl = 'https://pulsar-proxy.terraform-labs.workers.dev';

const getPulsarTimeseriesUrl = (address: string) =>
  `${pulsarBaseUrl}/wallet/${address}/timeseries?chain=TERRA2&tier=1d`;

export const getPulsarTimeseries = async (address: string): Promise<PulsarTimeseriesResponse> => {
  const { data } = await axios.get<PulsarTimeseriesResponse>(getPulsarTimeseriesUrl(address));
  return data;
};
