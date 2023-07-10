import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { Asset } from 'chain/Asset';
import { Spinner } from 'lib/ui/Spinner';
import { useCurrentDaoAssetWhitelistQuery } from 'queries/useCurrentDaoAssetWhitelistQuery';

interface Props {
  children: React.ReactNode;
}

const { provider: WhitelistedAssetsProvider, useValue: useCurrentDaoWhitelistedAssets } =
  getValueProviderSetup<Asset[]>('WhitelistedAssets');

export { useCurrentDaoWhitelistedAssets };

export const CurrentDAOWhitelistedAssetsProvider = ({ children }: Props) => {
  const { data: whitelistedAssets } = useCurrentDaoAssetWhitelistQuery();

  if (!whitelistedAssets) {
    return <Spinner />;
  }

  return <WhitelistedAssetsProvider value={whitelistedAssets}>{children}</WhitelistedAssetsProvider>;
};
