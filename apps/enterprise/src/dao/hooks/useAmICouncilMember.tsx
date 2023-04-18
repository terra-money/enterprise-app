import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const useAmICouncilMember = () => {
  // @ts-ignore
  const { dao_council } = useCurrentDao();

  const connectedWallet = useConnectedWallet();

  if (!dao_council || !connectedWallet) {
    return false;
  }

  return dao_council.members.includes(connectedWallet.walletAddress);
};
