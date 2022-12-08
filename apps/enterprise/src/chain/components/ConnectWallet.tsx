import { PopoverOpener } from 'lib/ui/popover/PopoverOpener';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { VStack } from 'lib/ui/Stack';
import { Panel } from 'lib/ui/Panel/Panel';
import { Text } from 'lib/ui/Text';
import { ConnectWalletOptions } from './ConnectWalletOptions';
import { BottomSlideOverOpener } from 'lib/ui/BottomSlideOver/BottomSlideOverOpener';
import { OpenerComponentProps } from 'lib/shared/props';

const title = 'Connect wallet';

export const ConnectWallet = ({ renderOpener }: OpenerComponentProps) => {
  return (
    <ResponsiveView
      small={() => (
        <BottomSlideOverOpener renderOpener={renderOpener} title={title}>
          <ConnectWalletOptions />
        </BottomSlideOverOpener>
      )}
      normal={() => (
        <PopoverOpener
          placement="bottom-end"
          renderOpener={renderOpener}
          renderContent={() => (
            <Panel width={400}>
              <VStack gap={20}>
                <Text size={20} weight="bold">
                  {title}
                </Text>
                <ConnectWalletOptions />
              </VStack>
            </Panel>
          )}
        />
      )}
    />
  );
};
