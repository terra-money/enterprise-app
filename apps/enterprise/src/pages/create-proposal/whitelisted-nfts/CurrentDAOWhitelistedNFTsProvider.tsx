import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { useDAONFTsWhitelist } from 'queries/useDAONFTsWhitelist';

interface Props {
  children: React.ReactNode;
}

const { provider: WhitelistedNFTsProvider, useValue: useCurrentDaoWhitelistedNFTs } =
  getValueProviderSetup<string[]>('WhitelistedNFTs');

export { useCurrentDaoWhitelistedNFTs };

export const CurrentDAOWhitelistedNFTsProvider = ({ children }: Props) => {
  const dao = useCurrentDao();

  const { data: whitelistedNFTs } = useDAONFTsWhitelist(dao.address);

  if (!whitelistedNFTs) {
    return <Throbber />;
  }

  return <WhitelistedNFTsProvider value={whitelistedNFTs}>{children}</WhitelistedNFTsProvider>;
};
