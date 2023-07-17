import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { CW20TokenInfoResponse } from 'queries';

interface CurrentTokenState {
  token: CW20TokenInfoResponse | undefined;
}

export const { useValue: useCurrentToken, provider: CurrentTokenProvider } =
  getValueProviderSetup<CurrentTokenState>('Token');
