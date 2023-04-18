import { getValueProviderSetup } from '@terra-money/apps/utils';
import { AssetInfo, AssetInfoQueryParams, useAssetInfoQuery } from 'chain/queries/useAssetInfoQuery';
import { Throbber } from 'components/primitives';

interface Props extends AssetInfoQueryParams {
  children: React.ReactNode;
}

const { provider: AssetInfoProvider, useValue: useCurrentAssetInfo } =
  getValueProviderSetup<AssetInfo>('AssetInfo');

export { useCurrentAssetInfo };

export const CurrentAssetInfoProvider = ({ children, ...queryParams }: Props) => {
  const { data } = useAssetInfoQuery(queryParams)

  if (!data) {
    return <Throbber />;
  }

  return <AssetInfoProvider value={data}>{children}</AssetInfoProvider>;
};
