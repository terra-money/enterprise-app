import { getValueProviderSetup } from '@terra-money/apps/utils';
import { DAO } from 'types';

export const { useValue: useCurrentDao, provider: CurrentDaoProvider } = getValueProviderSetup<DAO>('Dao');
