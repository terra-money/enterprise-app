import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Asset } from 'chain/Asset';
import { Throbber } from 'components/primitives';
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
    return <Throbber />;
  }

  return <WhitelistedAssetsProvider value={whitelistedAssets}>{children}</WhitelistedAssetsProvider>;
};
