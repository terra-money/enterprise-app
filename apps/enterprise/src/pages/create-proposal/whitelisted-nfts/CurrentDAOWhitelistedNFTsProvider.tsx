import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { Spinner } from 'lib/ui/Spinner';
import { useCurrentDaoNftWhitelistQuery } from 'queries/useCurrentDaoNftWhitelistQuery';

interface Props {
  children: React.ReactNode;
}

const { provider: WhitelistedNFTsProvider, useValue: useCurrentDaoWhitelistedNFTs } =
  getValueProviderSetup<string[]>('WhitelistedNFTs');

export { useCurrentDaoWhitelistedNFTs };

export const CurrentDAOWhitelistedNFTsProvider = ({ children }: Props) => {
  const { data: whitelistedNFTs } = useCurrentDaoNftWhitelistQuery();

  if (!whitelistedNFTs) {
    return <Spinner />;
  }

  return <WhitelistedNFTsProvider value={whitelistedNFTs}>{children}</WhitelistedNFTsProvider>;
};
