import { ConnectWallet } from 'chain/components/ConnectWallet';
import { Button } from 'lib/ui/buttons/Button';
import { Panel } from 'lib/ui/Panel/Panel';
import { VStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';

export const ConnectWalletPrompt = () => {
  return (
    <Panel>
      <VStack fullWidth fullHeight alignItems="center" justifyContent="center" gap={20}>
        <Text>Please connect your wallet</Text>
        <ConnectWallet
          renderOpener={(props) => (
            <div {...props}>
              <Button>Connect</Button>
            </div>
          )}
        />
      </VStack>
    </Panel>
  );
};
