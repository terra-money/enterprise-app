import { ClosableComponentProps } from 'lib/shared/props';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { Panel } from 'lib/ui/Panel/Panel';
import { HStack, VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

import { getVerticalPaddingCSS } from 'lib/ui/utils/getVerticalPaddingCSS';
import { CloseIconButton } from '../buttons/square/CloseIconButton';
import { getHorizontalMarginCSS } from '../utils/getHorizontalMarginCSS';

interface Props extends ClosableComponentProps {
  title: ReactNode;
  children: ReactNode;
}

const Container = styled(Panel)`
  background: ${({ theme: { colors, name } }) =>
    (name === 'dark' ? colors.foreground : colors.background).toCssValue()};
  overflow: hidden;
  min-width: 260px;
  max-width: 320px;
`;

const Header = styled(HStack)`
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  ${getHorizontalMarginCSS(12)};
  ${getVerticalPaddingCSS(12)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
`;

export const PopoverMenu = ({ children, title, onClose }: Props) => {
  return (
    <Container padding={4}>
      <VStack gap={12}>
        <Header>
          <Text weight="semibold" color="supporting" cropped>
            {title}
          </Text>
          <CloseIconButton onClick={onClose} />
        </Header>
        <VStack fullWidth alignItems="start">
          {children}
        </VStack>
      </VStack>
    </Container>
  );
};
