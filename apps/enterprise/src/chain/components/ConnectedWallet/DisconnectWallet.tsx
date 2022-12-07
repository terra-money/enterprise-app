import { useWallet } from '@terra-money/wallet-provider';
import { Button } from 'components/primitives';

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
