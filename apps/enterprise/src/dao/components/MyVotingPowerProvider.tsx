import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import Big from 'big.js';

export const { useValue: useMyVotingPower, provider: MyVotingPowerProvider } =
  getValueProviderSetup<Big>('MyVotingPower');
