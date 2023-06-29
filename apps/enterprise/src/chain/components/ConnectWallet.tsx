import { ConnectWalletOptions } from './ConnectWalletOptions';
import { PopoverMenuProps } from 'lib/ui/Menu/PopoverMenu';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { Opener } from 'lib/ui/Opener';
import { BottomSlideOver } from 'lib/ui/BottomSlideOver';
import { PopoverPanel } from 'lib/ui/Menu/PopoverPanel';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import styled from 'styled-components';

interface ConnectWalletProps extends Pick<PopoverMenuProps, 'renderOpener'> { }

const title = "Connect wallet"

const Popover = styled(PopoverPanel)`
  min-width: 280px;
`

export const ConnectWallet = ({ renderOpener }: ConnectWalletProps) => {
  return (
    <>
      <ResponsiveView
        small={() => (
          <Opener
            renderOpener={({ onOpen }) => renderOpener({
              onClick: onOpen,
              ref: () => { },
            })}
            renderContent={({ onClose }) => (
              <BottomSlideOver onClose={onClose} title={title}>
                <ConnectWalletOptions />
              </BottomSlideOver>
            )}
          />
        )}
        normal={() => (
          <Popover
            renderOpener={renderOpener}
            renderContent={() => (
              <VStack gap={20}>
                <Text size={20} weight="bold">
                  {title}
                </Text>
                <ConnectWalletOptions />
              </VStack>
            )}
          />
        )}
      />
    </>
  )
};
