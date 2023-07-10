import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { AssetInfoWithPrice } from 'chain/Asset';
import { Spinner } from 'lib/ui/Spinner';
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
    return <Spinner />;
  }

  return <TreasuryTokensProvider value={assets}>{children}</TreasuryTokensProvider>;
};
