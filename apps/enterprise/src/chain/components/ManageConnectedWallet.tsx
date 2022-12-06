import { useState } from 'react';
import { WalletButton } from 'chain/components/WalletButton';
import { useBoolean } from 'lib/shared/hooks/useBoolean';
import { Popover } from 'lib/ui/popover/Popover';
import { ConnectedWallet } from 'chain/components/ConnectedWallet/ConnectedWallet';

export const ManageConnectedWallet = () => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [isMenuOpen, { toggle: toggleMenu }] = useBoolean(false);

  return (
    <>
      <div ref={setAnchor}>{<WalletButton onClick={toggleMenu} />}</div>
      {anchor && isMenuOpen && (
        <Popover placement="bottom-end" onClickOutside={toggleMenu} anchor={anchor}>
          <ConnectedWallet />
        </Popover>
      )}
    </>
  );
};
