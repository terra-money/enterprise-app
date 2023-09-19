import { retry } from 'shared/retry';
import { Dao } from './Dao';
import { getPulsarTimeseries } from './getPulsarTimeseries';

export const getDaoTVL = async (
  dao: Pick<Dao, 'address' | 'membershipContractAddress' | 'enterpriseFactoryContract' | 'type'>
) => {
  const result = await retry({
    func: () => getPulsarTimeseries(dao.address),
    delay: 2000,
    attempts: 10,
  });

  return result.stats.current_networth;
};
