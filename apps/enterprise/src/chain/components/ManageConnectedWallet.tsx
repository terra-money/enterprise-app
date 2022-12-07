import { useState } from 'react';
import { WalletButton } from 'chain/components/WalletButton';
import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { Popover } from 'lib/ui/popover/Popover';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { BottomSlideOver } from 'lib/ui/BottomSlideOver';
import { ConnectedWalletSummary } from './ConnectedWallet/ConnectedWalletSummary';
import { DisconnectWallet } from './ConnectedWallet/DisconnectWallet';
import { Panel } from 'lib/ui/Panel/Panel';
import { VStack } from 'lib/ui/Stack';
import styled from 'styled-components';

const Container = styled(Panel)`
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
`;

export const ManageConnectedWallet = () => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [isMenuOpen, { toggle: toggleMenu }] = useBoolean(false);

  return (
    <>
      <div ref={setAnchor}>{<WalletButton onClick={toggleMenu} />}</div>
      {anchor && isMenuOpen && (
        <ResponsiveView
          normal={() => (
            <Popover placement="bottom-end" onClickOutside={toggleMenu} anchor={anchor}>
              <Container width={400}>
                <VStack gap={32}>
                  <ConnectedWalletSummary />
                  <DisconnectWallet />
                </VStack>
              </Container>
            </Popover>
          )}
          small={() => (
            <BottomSlideOver title={<ConnectedWalletSummary />} onClose={toggleMenu}>
              <DisconnectWallet />
            </BottomSlideOver>
          )}
        />
      )}
    </>
  );
};
