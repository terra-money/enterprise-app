import { AssetInfo } from 'chain/Asset';
import { AssetInfoQueryParams, useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { getValueProviderSetup } from 'lib/shared/utils/getValueProviderSetup';
import { Spinner } from 'lib/ui/Spinner';

interface Props extends AssetInfoQueryParams {
  children: React.ReactNode;
}

const { provider: AssetInfoProvider, useValue: useCurrentAssetInfo } = getValueProviderSetup<AssetInfo>('AssetInfo');

export { useCurrentAssetInfo };

export const CurrentAssetInfoProvider = ({ children, ...queryParams }: Props) => {
  const { data } = useAssetInfoQuery(queryParams);

  if (!data) {
    return <Spinner />;
  }

  return <AssetInfoProvider value={data}>{children}</AssetInfoProvider>;
};
