import { UIElementProps } from '@terra-money/apps/components';
import { useTerraNetwork } from 'chain/hooks/useTerraNetwork';
import { useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { SanctionModal } from 'lib/ui/SanctionModal';


export const NetworkGuard = (props: UIElementProps) => {
  const { children } = props;
  const connectedWallet = useConnectedWallet();
  const [sactionCheck, setSanctioncCeck] = useState<boolean>();

  const { moniker } = useTerraNetwork();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [moniker, queryClient]);

  useEffect(() => {
    // const checkSanction = async () => {
    //   if (connectedWallet) {
    //     const walletAddress = connectedWallet.walletAddress;
    //     const response = await fetch(`https://something.com/check/${walletAddress}`);
    //     const isSanctioned = await response.json();

    //     if (isSanctioned) {
    //       setSanctioncCeck(true);
    //     } else {
    //       setSanctioncCeck(false);
    //     }
    //   }
    // };
    // checkSanction();
  }, [connectedWallet]);

  if(sactionCheck) {
    return (
      <SanctionModal></SanctionModal>
    )
  }

  

  return <>{children}</>;
};
