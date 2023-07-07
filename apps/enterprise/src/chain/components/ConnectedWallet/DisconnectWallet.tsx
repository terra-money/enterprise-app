import { useWallet } from '@terra-money/wallet-provider';
import { Button } from 'lib/ui/buttons/Button';

export const DisconnectWallet = () => {
  const { disconnect } = useWallet();

  return (
    <Button
      onClick={() => {
        disconnect();
      }}
    >
      Disconnect wallet
    </Button>
  );
};
