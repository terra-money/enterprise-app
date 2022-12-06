import { getCSSUnit } from '@terra-money/apps/utils';
import { WalletConnectionButton } from 'components/wallet-connection-button';
import { CreateDaoButton } from 'dao/components/CreateDaoButton';
import { DashboardButton } from 'dao/components/DashboardButton';
import { ComponentWithChildrenProps } from 'lib/shared/props';
import { HStack, VStack } from 'lib/ui/Stack';
import { getVerticalPaddingCSS } from 'lib/ui/utils/getVerticalPaddingCSS';
import styled, { css } from 'styled-components';
import { Favourites } from '../Favourites';

const navigationHeight = 86;

const Container = styled(VStack)`
  height: 100%;
  position: relative;
`;

const ContentWr = styled.div`
  overflow-y: auto;
`;

const Content = styled.div`
  ${getVerticalPaddingCSS(navigationHeight)}
`;

const sharedNavigationSectionCSS = css`
  position: absolute;
  z-index: 1;
  left: 0;

  width: 100%;
  height: ${getCSSUnit(navigationHeight)};

  padding: 16px;
`;

const Header = styled(HStack)`
  ${sharedNavigationSectionCSS};
  top: 0;
  padding-top: 32px;

  border-bottom: 1px solid #242627;
  background: rgba(21, 23, 24, 0.9);
`;

const Footer = styled(HStack)`
  ${sharedNavigationSectionCSS};
  bottom: 0;
  padding-bottom: 32px;

  background: linear-gradient(180deg, rgba(21, 23, 24, 0) 0%, #151718 100%);
`;

export const MobileNavigation = ({ children }: ComponentWithChildrenProps) => {
  return (
    <Container>
      <Header alignItems="center" justifyContent="space-between">
        <div />
        <WalletConnectionButton />
      </Header>
      <ContentWr>
        <Content>{children}</Content>
      </ContentWr>
      <Footer alignItems="center" justifyContent="space-between">
        <HStack gap={16}>
          <DashboardButton />
          <Favourites />
        </HStack>
        <CreateDaoButton />
      </Footer>
    </Container>
  );
};
