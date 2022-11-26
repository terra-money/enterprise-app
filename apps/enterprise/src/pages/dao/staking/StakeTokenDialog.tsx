import { DialogProps, useDialog } from '@terra-money/apps/hooks';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from 'components/dialog';
import { NumericPanel } from 'components/numeric-panel';
import { Button } from 'components/primitives';
import { useStakeTokenForm } from './useStakeTokenForm';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { AmountInput } from 'components/amount-input';
import { demicrofy, microfy } from '@terra-money/apps/libs/formatting';
import { useStakeTokenTx } from 'tx';
import styles from './StakeTokenDialog.module.sass';

interface StakeTokenDialogProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  balance: u<Big>;
  staked: u<Big>;
  symbol: string;
  decimals: number;
}

const StakeTokenDialog = (props: DialogProps<StakeTokenDialogProps>) => {
  const { daoAddress, tokenAddress, balance, staked, symbol, decimals, closeDialog } = props;

  const [input, { amount, submitDisabled }] = useStakeTokenForm({ balance, decimals });

  const [txResult, stakeTokenTx] = useStakeTokenTx();

  return (
    <Dialog className={styles.root}>
      <DialogHeader title="Stake your tokens" onClose={() => closeDialog(undefined, { closeAll: true })} />
      <DialogBody className={styles.body}>
        <NumericPanel title="Currently staking" value={demicrofy(staked, decimals)} decimals={2} suffix={symbol} />
        <AmountInput
          value={amount}
          placeholder="Type amount to stake"
          maxAmount={demicrofy(balance, decimals)}
          symbol={symbol}
          onChange={(event) => input({ amount: event.target.value })}
          onMaxClick={() => input({ amount: demicrofy(balance, decimals).toString() })}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          disabled={submitDisabled}
          loading={txResult.loading}
          onClick={async () => {
            if (submitDisabled === false && amount) {
              await stakeTokenTx({
                daoAddress,
                tokenAddress,
                amount: microfy(Big(amount), decimals),
              });
              closeDialog(undefined);
            }
          }}
        >
          Stake
        </Button>
        <Button variant="secondary" onClick={() => closeDialog(undefined)}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export const useStakeTokenDialog = () => {
  return useDialog(StakeTokenDialog);
};
