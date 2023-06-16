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
import { AssetItem } from "./AssetItem"
import { SameWidthChildrenRow } from "lib/ui/Layout/SameWidthChildrenRow"
import { PrimaryButton } from "lib/ui/buttons/rect/PrimaryButton"
import { useMemo, useState } from "react"
import { DepositIntoTreasury } from "pages/dao/deposit"

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

const ColumnName = styled(Text)`
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
            {isLoading && <Spinner />}
          </HStack>
        </ContentFrame>
      )}
      renderContent={() => (
        <ContentFrame>
          <div />
          <VStack gap={24}>
            {assetsToDisplay && assetsToDisplay.length > 0 && (
              <VStack gap={20}>
                <HStack style={{ paddingRight: 16 }} fullWidth justifyContent="space-between">
                  <ColumnName>
                    Asset
                  </ColumnName>
                  <ColumnName>
                    Amount
                  </ColumnName>
                  <ColumnName>
                    Price
                  </ColumnName>
                </HStack>
                <VStack gap={16}>
                  {assetsToDisplay.map((asset, index) => (
                    <AssetItem key={index} asset={asset} />
                  ))}
                </VStack>
              </VStack>
            )}
            <HStack wrap="wrap" alignItems="center" fullWidth justifyContent="space-between">
              <Text color="supporting" size={16}>{renderFooterMsg()}</Text>
              <SameWidthChildrenRow gap={16} childrenWidth={186}>
                {assets && assetsToDisplay && assetsToDisplay.length < assets.length && <PrimaryButton kind="secondary" onClick={() => setShouldShowAllAssets(!shouldShowAllAssets)}>Show more</PrimaryButton>}
                <DepositIntoTreasury />
              </SameWidthChildrenRow>
            </HStack>
          </VStack>
        </ContentFrame>
      )}
    />
  )
}