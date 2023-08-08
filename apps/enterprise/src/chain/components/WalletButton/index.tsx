
// TODO: migrate from sass to styled-components
import { useWallet, WalletStatus } from '@terra-money/wallet-kit';
import { ReactComponent as WalletIcon } from 'components/assets/Wallet.svg';
import { useMyAddress } from 'chain/hooks/useMyAddress';
import { Spinner } from 'lib/ui/Spinner';
import styled from 'styled-components';
import { getSameDimensionsCSS } from 'lib/ui/utils/getSameDimensionsCSS';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';
import { getColor, matchColor } from 'lib/ui/theme/getters';
import { IconButton } from 'lib/ui/buttons/IconButton';

interface WalletButtonProps {
  onClick?: () => void;
}

const Wrapper = styled.div`
  position: relative;
`;

const Button = styled(IconButton)`
  ${getSameDimensionsCSS(48)};
`;

const Indicator = styled.div<{ isConnected: boolean }>`
  ${getSameDimensionsCSS(20)};
  ${roundedCSS};
  border: 4px solid ${getColor('background')};
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${matchColor('isConnected', {
    true: 'success',
    false: 'alert',
  })};
`;

export const WalletButton = ({ onClick }: WalletButtonProps) => {
  const { status } = useWallet();

  const myAddress = useMyAddress();

  const isInitializing = status === WalletStatus.INITIALIZING;

  return (
    <Wrapper>
      <Button
        title="Wallet"
        isDisabled={isInitializing}
        onClick={onClick}
        icon={isInitializing ? <Spinner /> : <WalletIcon />}
      />
      <Indicator isConnected={!!myAddress} />
    </Wrapper>
  );
};
