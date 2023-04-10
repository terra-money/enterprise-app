import { getValueProviderSetup } from '@terra-money/apps/utils';
import { enterprise } from 'types/contracts';

export const { useValue: useCurrentDao, provider: CurrentDaoProvider } = getValueProviderSetup<enterprise.DaoInfoResponse>('Dao');
