import { getValueProviderSetup } from '@terra-money/apps/utils';
import { AssetInfoWithPrice } from 'chain/Asset';
import { Throbber } from 'components/primitives';
import { useDaoAssets } from 'queries/useDaoAssets';

interface Props {
  children: React.ReactNode;
}

const { provider: TreasuryTokensProvider, useValue: useCurrentDaoTreasuryTokens } =
  getValueProviderSetup<AssetInfoWithPrice[]>('TreasuryTokens');

export { useCurrentDaoTreasuryTokens };

export const CurrentDAOTreasuryTokensProvider = ({ children }: Props) => {
  const { data: assets } = useDaoAssets();

  if (!assets) {
    return <Throbber />;
  }

  return <TreasuryTokensProvider value={assets}>{children}</TreasuryTokensProvider>;
};
