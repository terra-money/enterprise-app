import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { useDAOAssetsWhitelist } from 'queries';
import { enterprise } from 'types/contracts';

interface Props {
  children: React.ReactNode;
}

const { provider: WhitelistedAssetsProvider, useValue: useCurrentDaoWhitelistedAssets } =
  getValueProviderSetup<enterprise.AssetInfoBaseFor_Addr[]>('WhitelistedAssets');

export { useCurrentDaoWhitelistedAssets };

export const CurrentDAOWhitelistedAssetsProvider = ({ children }: Props) => {
  const dao = useCurrentDao();

  const { data: whitelistedAssets } = useDAOAssetsWhitelist(dao.address);

  if (!whitelistedAssets) {
    return <Throbber />;
  }

  return <WhitelistedAssetsProvider value={whitelistedAssets}>{children}</WhitelistedAssetsProvider>;
};
