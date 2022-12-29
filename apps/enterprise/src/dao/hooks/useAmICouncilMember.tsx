import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const useAmICouncilMember = () => {
  const { council } = useCurrentDao();

  const connectedWallet = useConnectedWallet();

  if (!council || !connectedWallet) {
    return false;
  }

  return council.members.includes(connectedWallet.walletAddress);
};
