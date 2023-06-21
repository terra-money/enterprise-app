import { getPricesOfLiquidAssets } from 'chain/utils/getPricesOfLiquidAssets';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';

export const usePricesOfLiquidAssets = () => {
  return useQuery(QUERY_KEY.PRICES_OF_LIQUID_ASSETS, getPricesOfLiquidAssets, {
    refetchOnMount: false
  });
};
