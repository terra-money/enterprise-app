import { NumericPanel } from 'components/numeric-panel';
import { useStakeTokenForm } from './useStakeTokenForm';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { demicrofy, microfy } from '@terra-money/apps/libs/formatting';
import { useStakeTokenTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';

interface StakeTokenOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  balance: u<Big>;
  staked: u<Big>;
  symbol: string;
  decimals: number;
}

export const StakeTokenOverlay = ({
  daoAddress,
  tokenAddress,
  balance,
  staked,
  symbol,
  decimals,
  onClose,
}: StakeTokenOverlayProps) => {
  const [input, { amount, submitDisabled }] = useStakeTokenForm({ balance, decimals });

  const [txResult, stakeTokenTx] = useStakeTokenTx();

  return (
    <Modal
      title="Stake your tokens"
      onClose={onClose}
      renderContent={() => (
        <VStack gap={16}>
          <NumericPanel title="Currently staking" value={demicrofy(staked, decimals)} decimals={2} suffix={symbol} />
          <AmountTextInput
            value={amount}
            placeholder="Enter a staking amount"
            suggestion={
              <AmountSuggestion
                value={fromChainAmount(balance.toString(), decimals)}
                name="Max"
                onSelect={(amount) => input({ amount })}
              />
            }
            unit={symbol}
            onValueChange={(amount) => input({ amount })}
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
                await stakeTokenTx({
                  daoAddress,
                  tokenAddress,
                  amount: microfy(Big(amount), decimals),
                });
                onClose();
              }
            }}
          >
            Stake
          </PrimaryButton>
          <PrimaryButton kind="secondary" onClick={onClose}>
            Cancel
          </PrimaryButton>
        </VStack>
      }
    />
  );
};
