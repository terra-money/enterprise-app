import { getValueProviderSetup } from '@terra-money/apps/utils';
import { CW20TokenInfoResponse } from 'queries';

interface CurrentTokenState {
  token: CW20TokenInfoResponse | undefined;
}

export const { useValue: useCurrentToken, provider: CurrentTokenProvider } =
  getValueProviderSetup<CurrentTokenState>('Token');
