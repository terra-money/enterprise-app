import { useStakeTokenForm } from './useStakeTokenForm';

import Big from 'big.js';
import { useStakeTokenTx } from 'tx';
import { ClosableComponentProps } from 'lib/shared/props';
import { Modal } from 'lib/ui/Modal';
import { VStack } from 'lib/ui/Stack';
import { Button } from 'lib/ui/buttons/Button';
import { AmountTextInput } from 'lib/ui/inputs/AmountTextInput';
import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { AmountSuggestion } from 'lib/ui/inputs/AmountSuggestion';
import { toChainAmount } from 'chain/utils/toChainAmount';
import { Panel } from 'lib/ui/Panel/Panel';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';

interface StakeTokenOverlayProps extends ClosableComponentProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  balance: string;
  staked: Big;
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
          <Panel>
            <TitledSection title="Currently staking">
              <NumericStatistic value={fromChainAmount(Big(staked).toNumber(), decimals)} suffix={symbol} />
            </TitledSection>
          </Panel>
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
          <Button
            isDisabled={submitDisabled}
            isLoading={txResult.loading}
            onClick={async () => {
              if (submitDisabled === false && amount) {
                await stakeTokenTx({
                  daoAddress,
                  tokenAddress,
                  amount: toChainAmount(amount, decimals),
                });
                onClose();
              }
            }}
          >
            Stake
          </Button>
          <Button kind="secondary" onClick={onClose}>
            Cancel
          </Button>
        </VStack>
      }
    />
  );
};
