import { WalletButton } from 'chain/components/WalletButton';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { ConnectedWalletSummary } from './ConnectedWallet/ConnectedWalletSummary';
import { DisconnectWallet } from './ConnectedWallet/DisconnectWallet';
import { Panel } from 'lib/ui/Panel/Panel';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';
import { PopoverOpener } from 'lib/ui/popover/PopoverOpener';
import { BottomSlideOverOpener } from 'lib/ui/BottomSlideOver/BottomSlideOverOpener';

const Container = styled(Panel)`
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
`;

export const ManageConnectedWallet = () => {
  return (
    <ResponsiveView
      normal={() => (
        <PopoverOpener
          placement="bottom-end"
          renderOpener={({ onClick }) => <WalletButton onClick={onClick} />}
          renderContent={() => (
            <Container width={400}>
              <VStack gap={32}>
                <ConnectedWalletSummary />
                <DisconnectWallet />
              </VStack>
            </Container>
          )}
        />
      )}
      small={() => (
        <BottomSlideOverOpener
          renderOpener={({ onClick }) => <WalletButton onClick={onClick} />}
          title={<ConnectedWalletSummary />}
        >
          <DisconnectWallet />
        </BottomSlideOverOpener>
      )}
    />
  );
};
