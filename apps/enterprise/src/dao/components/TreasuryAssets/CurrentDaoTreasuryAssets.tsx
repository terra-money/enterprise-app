import { pluralize } from "lib/shared/utils/pluralize"
import { ExpandablePanel } from "lib/ui/Panel/ExpandablePanel"
import { Spinner } from "lib/ui/Spinner"
import { HStack, VStack } from "lib/ui/Stack"
import { Text } from "lib/ui/Text"
import { DatabaseIcon } from "lib/ui/icons/DatabaseIcon"
import { centerContentCSS } from "lib/ui/utils/centerContentCSS"
import { roundedCSS } from "lib/ui/utils/roundedCSS"
import { useDaoAssets } from "queries/useDaoAssets"
import styled from "styled-components"
import { AssetItem, AssetItemFrame } from "./AssetItem"
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton"
import { useMemo, useState } from "react"
import { DepositIntoTreasury } from "pages/dao/deposit"
import { getHorizontalMarginCSS } from "lib/ui/utils/getHorizontalMarginCSS"
import { formatAmount } from "@terra-money/apps/libs/formatting"
import { getAssetBalanceInUsd } from "chain/Asset"
import { sum } from "lib/shared/utils/sum"

const ContentFrame = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr;
  align-items: center;
  gap: 24px;  
  width: 100%;
`

const Identifier = styled.div`
  /* width: 100%; */
  aspect-ratio: 1/1;
  ${roundedCSS};
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
  ${centerContentCSS};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrast.toCssValue()};
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 186px);
  gap: 16px;
`

const Header = styled(AssetItemFrame)`
  ${getHorizontalMarginCSS(16)}

  color: ${({ theme }) => theme.colors.textSupporting2.toCssValue()};
  font-weight: 500;
  font-size: 16px;
`

export const CurrentDaoTreasuryAssets = () => {
  const { data: assets, isLoading } = useDaoAssets()

  const [shouldShowAllAssets, setShouldShowAllAssets] = useState(false)
  const assetsToDisplay = useMemo(() => {
    if (!assets) return []

    return shouldShowAllAssets ? assets : assets.slice(0, 4)
  }, [assets, shouldShowAllAssets])


  const renderFooterMsg = () => {
    if (isLoading) {
      return 'Loading assets'
    }

    if (!assets) {
      return 'Failed to load assets'
    }

    if (assets.length === 0) {
      return 'No assets'
    }

    return `Displaying ${assetsToDisplay?.length} of ${pluralize(assets.length, 'asset')} total`
  }

  return (
    <ExpandablePanel
      isExpandedInitially
      header={(
        <ContentFrame>
          <Identifier>
            <DatabaseIcon />
          </Identifier>
          <HStack fullWidth alignItems="center" justifyContent="space-between">
            <Text weight="semibold" size={20}>
              Wallet Holdings
            </Text>
            {isLoading ? <Spinner /> : assets ?
              <Text size={20} weight="semibold">
                ${formatAmount(sum(assets?.map(asset => getAssetBalanceInUsd(asset))))}
              </Text> : <div />}
          </HStack>
        </ContentFrame>
      )}
      renderContent={() => (
        <ContentFrame>
          <div />
          <VStack gap={24}>
            {assetsToDisplay && assetsToDisplay.length > 0 && (
              <VStack gap={20}>
                <Header>
                  <Text>
                    Asset
                  </Text>
                  <Text>
                    Amount
                  </Text>
                  <Text>
                    Price
                  </Text>
                </Header>
                <VStack gap={16}>
                  {assetsToDisplay.map((asset, index) => (
                    <AssetItem key={index} asset={asset} />
                  ))}
                </VStack>
              </VStack>
            )}
            <HStack wrap="wrap" alignItems="center" fullWidth justifyContent="space-between">
              <Text color="supporting" size={16}>{renderFooterMsg()}</Text>
              <Actions>
                {assets ? <PrimaryButton kind="secondary" onClick={() => setShouldShowAllAssets(!shouldShowAllAssets)}>{assetsToDisplay.length < assets.length ? 'Show more' : 'Show less'}</PrimaryButton> : <div />}
                <DepositIntoTreasury />
              </Actions>
            </HStack>
          </VStack>
        </ContentFrame>
      )}
    />
  )
}