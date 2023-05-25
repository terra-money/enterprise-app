import { NumericPanel } from 'components/numeric-panel';
import { useUnstakeTokenForm } from './useUnstakeTokenForm';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { AmountInput } from 'components/amount-input';
import { demicrofy, microfy } from '@terra-money/apps/libs/formatting';
import { useUnstakeTokenTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';

interface UnstakeTokenOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  staked: u<Big>;
  symbol: string;
  decimals: number;
}

export const UnstakeTokenOverlay = ({ daoAddress, staked, symbol, decimals, onClose }: UnstakeTokenOverlayProps) => {
  const [input, { amount, submitDisabled }] = useUnstakeTokenForm({ staked, decimals });

  const [txResult, unstakeTokenTx] = useUnstakeTokenTx();

  return (
    <Modal
      title="Unstake your tokens"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="Currently staking" value={demicrofy(staked, decimals)} decimals={2} suffix={symbol} />
          <AmountInput
            value={amount}
            placeholder="Enter an amount to unstake"
            maxAmount={demicrofy(staked, decimals)}
            symbol={symbol}
            onChange={(event) => input({ amount: event.target.value })}
            onMaxClick={() => input({ amount: demicrofy(staked, decimals).toString() })}
          />
        </VStack>
      )}
      footer={
        <VStack gap={12}>
          <PrimaryButton
            isDisabled={submitDisabled}
            isLoading={txResult.loading}
            onClick={async () => {
              if (submitDisabled === false && amount) {
                await unstakeTokenTx({
                  daoAddress,
                  amount: microfy(Big(amount), decimals),
                });
                onClose();
              }
            }}
          >
            Unstake
          </PrimaryButton>
          <PrimaryButton kind="secondary" onClick={onClose}>
            Cancel
          </PrimaryButton>
        </VStack>
      }
    />
  );
};
