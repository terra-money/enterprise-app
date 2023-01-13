import { useTokens } from '@terra-money/apps/hooks';
import { Token } from 'types';
import { CW20Addr, u } from '@terra-money/apps/types';
import Big, { BigSource } from 'big.js';
import { getAssetKey, getAssetType } from 'pages/create-proposal/whitelisted-assets/helpers/areSameAssets';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { usePricesQuery } from '@terra-money/apps/queries';
import { useDAOAssetTreasury } from './useDAOAssetTreasury';
import { useQuery } from 'react-query';
import { QUERY_KEY } from './queryKey';
import { fetchCW20TokenInfo } from './useCW20TokenInfoQuery';
import { useWallet } from '@terra-money/wallet-provider';
import { assertDefined } from '@terra-money/apps/utils';

export type TreasuryToken = Token & { amount: u<BigSource>; usdAmount?: Big };

export const useTreasuryTokensQuery = (address: string) => {
  const { data: assets } = useDAOAssetTreasury(address);
  const { tokens } = useTokens();
  const { data: prices } = usePricesQuery();

  const { network } = useWallet();

  return useQuery(
    [QUERY_KEY.TREASURY_TOKENS, address],
    async () => {
      const result = [] as TreasuryToken[];
      await Promise.all(
        assertDefined(assets).map(async (asset) => {
          const tokenKey = getAssetKey(asset.info);
          let token = tokens[tokenKey];
          if (!token && getAssetType(asset.info) === 'cw20') {
            try {
              const tokenInfo = await fetchCW20TokenInfo(network, tokenKey);

              token = {
                ...tokenInfo,
                type: 'cw20',
                key: tokenKey,
                token: tokenKey as CW20Addr,
                icon: '',
                protocol: '',
              };
            } catch {
              console.log(`Failed to fetch token info for ${tokenKey}`);
            }
          }

          const amount = Big(asset.amount);
          if (token && amount.gt(0)) {
            const price = assertDefined(prices)[tokenKey];
            result.push({
              ...token,
              amount: asset.amount as u<BigSource>,
              usdAmount: price ? demicrofy(amount as u<BigSource>, token.decimals).mul(price) : undefined,
            });
          }
        })
      );

      return result;
    },
    {
      enabled: !!(assets && tokens && prices),
    }
  );
};
