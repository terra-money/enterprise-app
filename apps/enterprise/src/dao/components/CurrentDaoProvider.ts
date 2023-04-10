import { getValueProviderSetup } from '@terra-money/apps/utils';
import { DaoInfo } from 'dao';

export const { useValue: useCurrentDao, provider: CurrentDaoProvider } = getValueProviderSetup<DaoInfo>('Dao');
