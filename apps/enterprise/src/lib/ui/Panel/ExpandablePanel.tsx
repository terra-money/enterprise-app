import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { defaultTransitionCSS } from '../animations/transitions';
import { UnstyledButton } from '../buttons/UnstyledButton';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { HStack, VStack } from '../Stack';
import { centerContentCSS } from '../utils/centerContentCSS';
import { getSameDimensionsCSS } from '../utils/getSameDimensionsCSS';
import { roundedCSS } from '../utils/roundedCSS';
import { Panel, PanelProps } from './Panel';
import { Line } from '../Line';

interface ExpandableProps extends PanelProps {
  header: ReactNode;
  renderContent: () => ReactNode;
  isExpandedInitially?: boolean;
}

const ExpandIconWrapper = styled.div<{ isExpanded: boolean }>`
  ${roundedCSS};
  ${getSameDimensionsCSS(48)};
  ${centerContentCSS};

  background: ${({ theme }) => theme.colors.mist.toCssValue()};

  ${defaultTransitionCSS};

  font-size: 20px;

  transform: rotateZ(${({ isExpanded }) => (isExpanded ? '-180deg' : '0deg')});
`;

const Header = styled(UnstyledButton)`
  ${defaultTransitionCSS};
  width: 100%;

  :hover ${ExpandIconWrapper} {
    background: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`;

export const ExpandablePanel = ({
  header,
  renderContent,
  isExpandedInitially = false,
  ...panelProps
}: ExpandableProps) => {
  const [isExpanded, { toggle }] = useBoolean(isExpandedInitially);

  return (
    <Panel {...panelProps}>
      <Header onClick={toggle}>
        <HStack fullWidth justifyContent="space-between" alignItems="center" gap={20}>
          {header}
          <ExpandIconWrapper isExpanded={isExpanded}>
            <ChevronDownIcon />
          </ExpandIconWrapper>
        </HStack>
      </Header>
      {isExpanded && (
        <VStack gap={24}>
          <div />
          <Line />
          {renderContent()}
        </VStack>
      )}
    </Panel>
  );
};
