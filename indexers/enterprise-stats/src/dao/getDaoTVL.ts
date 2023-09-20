import { Dao } from './Dao';
import { getTimeseries } from 'pulsar';

export const getDaoTVL = async (
  dao: Pick<Dao, 'address' | 'membershipContractAddress' | 'enterpriseFactoryContract' | 'type'>
) => {
  const result = await getTimeseries(dao.address);

  return result.stats.current_networth;
};
