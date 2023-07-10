import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { DaoInfo } from 'dao';

export const { useValue: useCurrentDao, provider: CurrentDaoProvider } = getValueProviderSetup<DaoInfo>('Dao');
