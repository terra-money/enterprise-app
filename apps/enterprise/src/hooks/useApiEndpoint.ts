import { useNetworkName } from 'chain/hooks/useNetworkName';
import { Frequency } from 'utils';

const API_ENDPOINTS: Record<string, string> = {
  mainnet: 'https://g4cfb9d6qf.execute-api.us-east-1.amazonaws.com/v1',
  //overriding the api gw endpoint to point at the staging environment in staging branch
  //testnet: 'https://jdrv0zpoc4.execute-api.us-east-1.amazonaws.com/v1',
  testnet: 'https://4me4sow9wd.execute-api.us-east-1.amazonaws.com/v1',
  //testnet: 'http://localhost:3000',
  localterra: 'http://localhost:3000',
};

const serialize = <Params extends {}>(params: Params): string => {
  return Object.entries(params)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export type Direction = 'asc' | 'desc';

type AnalyticsEndpoint = {
  path: 'v1/analytics';
  params: {
    frequency: Frequency;
    limit: number;
    direction?: Direction;
    type: string;
  };
};

type HealthCheckEndpoint = {
  path: 'v1/health-check';
  params: { type: string };
};

type DaosEndpoint = {
  path: 'v1/daos';
  params: { query?: string; limit?: number; direction?: Direction };
};

type DaoEndpoint = {
  path: 'v1/daos/{address}';
  route: { address: string };
};

type DaoProposalsEndpoint = {
  path: 'v1/daos/{address}/proposals';
  route: { address: string };
  params: { limit: number; direction?: Direction };
};

type DaoProposalEndpoint = {
  path: 'v1/daos/{address}/proposals/{id}';
  route: { address: string; id: number };
};

type ProposalsEndpoint = {
  path: 'v1/proposals';
  params: { limit: number; direction?: Direction };
};

export type ApiEndpoints =
  | AnalyticsEndpoint
  | HealthCheckEndpoint
  | DaoEndpoint
  | DaosEndpoint
  | DaoProposalEndpoint
  | DaoProposalsEndpoint
  | ProposalsEndpoint;

export const createApiEndpoint = (network: string, endpoint: ApiEndpoints): string => {
  let uri = `${API_ENDPOINTS[network]}/${endpoint.path}`;

  if ('route' in endpoint) {
    Object.entries(endpoint.route).forEach(([key, value]) => {
      uri = uri.replace(`{${key}}`, value.toString());
    });
  }

  if ('params' in endpoint) {
    uri = `${uri}?${serialize(endpoint.params)}`;
  }

  return uri;
};

export const useApiEndpoint = (endpoint: ApiEndpoints): string => {
  const networkName = useNetworkName();

  return createApiEndpoint(networkName, endpoint);
};
