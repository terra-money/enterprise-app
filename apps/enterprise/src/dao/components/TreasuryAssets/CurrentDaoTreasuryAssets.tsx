import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { DatabaseIcon } from 'lib/ui/icons/DatabaseIcon';
import { useDaoAssets } from 'queries/useDaoAssets';
import styled from 'styled-components';
import { AssetItem, AssetItemFrame } from './AssetItem';
import { DepositIntoTreasury } from 'pages/dao/deposit';
import { getHorizontalMarginCSS } from 'lib/ui/utils/getHorizontalMarginCSS';
import { getAssetBalanceInUsd } from 'chain/Asset';
import { sum } from 'lib/shared/utils/sum';
import { TreasuryPanel } from '../TreasuryPanel';

const Header = styled(AssetItemFrame)`
  ${getHorizontalMarginCSS(16)}

  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-weight: 500;
  font-size: 16px;
`;

export const CurrentDaoTreasuryAssets = () => {
  const { data: assets, isError } = useDaoAssets();

  return (
    <TreasuryPanel
      icon={<DatabaseIcon />}
      title="Treasury Holdings"
      itemName="asset"
      items={assets}
      isError={isError}
      getTotalUsdValue={(assets) => sum(assets.map(getAssetBalanceInUsd))}
      depositAction={<DepositIntoTreasury />}
      renderItems={(assets) => (
        <VStack gap={20}>
          <Header>
            <Text>Asset</Text>
            <Text>Amount</Text>
            <Text>Price</Text>
          </Header>
          <VStack gap={16}>
            {assets.map((asset, index) => (
              <AssetItem key={index} asset={asset} />
            ))}
          </VStack>
        </VStack>
      )}
    />
  );
};
