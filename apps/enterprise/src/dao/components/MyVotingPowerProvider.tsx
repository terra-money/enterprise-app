import { getValueProviderSetup } from '@terra-money/apps/utils';
import Big from 'big.js';

export const { useValue: useMyVotingPower, provider: MyVotingPowerProvider } =
  getValueProviderSetup<Big>('MyVotingPower');
