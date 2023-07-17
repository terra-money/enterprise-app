import { useUnstakeTokenForm } from './useUnstakeTokenForm';
import Big from 'big.js';
import { useUnstakeTokenTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { toChainAmount } from 'chain/utils/toChainAmount';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

interface UnstakeTokenOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  staked: Big;
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
          <Panel>
            <TitledSection title="Currently staking">
              <NumericStatistic value={fromChainAmount(staked.toString(), decimals)} suffix={symbol} />
            </TitledSection>
          </Panel>
          <AmountTextInput
            value={amount}
            placeholder="Enter an amount to unstake"
            suggestion={
              <AmountSuggestion
                value={fromChainAmount(staked.toString(), decimals)}
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
          <Button
            isDisabled={submitDisabled}
            isLoading={txResult.loading}
            onClick={async () => {
              if (submitDisabled === false && amount) {
                await unstakeTokenTx({
                  daoAddress,
                  amount: toChainAmount(amount, decimals),
                });
                onClose();
              }
            }}
          >
            Unstake
          </Button>
          <Button kind="secondary" onClick={onClose}>
            Cancel
          </Button>
        </VStack>
      }
    />
  );
};
