import { pluralize } from 'lib/shared/utils/pluralize';
import { ExpandablePanel } from 'lib/ui/Panel/ExpandablePanel';
import { Spinner } from 'lib/ui/Spinner';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import styled from 'styled-components';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { ReactNode, useMemo, useState } from 'react';
import { formatAmount } from '@terra-money/apps/libs/formatting';

const ContentFrame = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const Identifier = styled.div`
  aspect-ratio: 1/1;
  ${roundedCSS};
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
  ${centerContentCSS};
  font-size: 20px;
  color: ${({ theme }) => theme.colors.contrast.toCssValue()};
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 186px);
  gap: 16px;
`;

interface TreasuryPanelProps<T> {
  title: string
  icon: ReactNode
  itemName: string
  items: T[] | undefined
  isError?: boolean
  getTotalUsdValue: (items: T[]) => number
  depositAction: ReactNode
  renderItems: (items: T[]) => ReactNode
}

export function TreasuryPanel<T>({ icon, itemName, items, isError, getTotalUsdValue, depositAction, renderItems, title }: TreasuryPanelProps<T>) {
  const isLoading = !items && !isError;
  console.log({ itemName, items, isError })
  const [shouldShowAllItems, setShouldShowAllItems] = useState(false);
  const itemsToDisplay = useMemo(() => {
    if (!items) return [];

    return shouldShowAllItems ? items : items.slice(0, 4);
  }, [items, shouldShowAllItems]);

  const renderFooterMsg = () => {
    if (isError) {
      return `Failed to load ${itemName}s`;
    }

    if (!items) {
      return `Loading ${itemName}s`;
    }

    if (items.length === 0) {
      return `No ${itemName}s`;
    }

    return `Displaying ${itemsToDisplay?.length} of ${pluralize(items.length, itemName)} total`;
  };

  return (
    <ExpandablePanel
      isExpandedInitially
      header={
        <ContentFrame>
          <Identifier>
            {icon}
          </Identifier>
          <HStack fullWidth alignItems="center" justifyContent="space-between">
            <Text weight="semibold">{title}</Text>
            {isLoading ? (
              <Spinner />
            ) : items ? (
              <Text weight="semibold">${formatAmount(getTotalUsdValue(items))}</Text>
            ) : (
              <div />
            )}
          </HStack>
        </ContentFrame>
      }
      renderContent={() => (
        <ContentFrame>
          <div />
          <VStack gap={24}>
            {itemsToDisplay && itemsToDisplay.length > 0 && renderItems(itemsToDisplay)}
            <HStack wrap="wrap" alignItems="center" fullWidth justifyContent="space-between">
              <Text color="supporting" size={16}>
                {renderFooterMsg()}
              </Text>
              <Actions>
                {items ? (
                  <PrimaryButton kind="secondary" onClick={() => setShouldShowAllItems(!shouldShowAllItems)}>
                    {itemsToDisplay.length < items.length ? 'Show more' : 'Show less'}
                  </PrimaryButton>
                ) : (
                  <div />
                )}
                {depositAction}
              </Actions>
            </HStack>
          </VStack>
        </ContentFrame>
      )}
    />
  );
};
