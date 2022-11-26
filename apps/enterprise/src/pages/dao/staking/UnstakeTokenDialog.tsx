import { DialogProps, useDialog } from '@terra-money/apps/hooks';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from 'components/dialog';
import { NumericPanel } from 'components/numeric-panel';
import { Button } from 'components/primitives';
import { useUnstakeTokenForm } from './useUnstakeTokenForm';
import { u } from '@terra-money/apps/types';
import Big from 'big.js';
import { AmountInput } from 'components/amount-input';
import { demicrofy, microfy } from '@terra-money/apps/libs/formatting';
import { useUnstakeTokenTx } from 'tx';
import styles from './UnstakeTokenDialog.module.sass';

interface UnstakeTokenDialogProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  staked: u<Big>;
  symbol: string;
  decimals: number;
}

const UnstakeTokenDialog = (props: DialogProps<UnstakeTokenDialogProps>) => {
  const { daoAddress, staked, symbol, decimals, closeDialog } = props;

  const [input, { amount, submitDisabled }] = useUnstakeTokenForm({ staked, decimals });

  const [txResult, unstakeTokenTx] = useUnstakeTokenTx();

  return (
    <Dialog className={styles.root}>
      <DialogHeader title="Unstake your tokens" onClose={() => closeDialog(undefined, { closeAll: true })} />
      <DialogBody className={styles.body}>
        <NumericPanel title="Currently staking" value={demicrofy(staked, decimals)} decimals={2} suffix={symbol} />
        <AmountInput
          value={amount}
          placeholder="Type amount to unstake"
          maxAmount={demicrofy(staked, decimals)}
          symbol={symbol}
          onChange={(event) => input({ amount: event.target.value })}
          onMaxClick={() => input({ amount: demicrofy(staked, decimals).toString() })}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          disabled={submitDisabled}
          loading={txResult.loading}
          onClick={async () => {
            if (submitDisabled === false && amount) {
              await unstakeTokenTx({
                daoAddress,
                amount: microfy(Big(amount), decimals),
              });
              closeDialog(undefined);
            }
          }}
        >
          Unstake
        </Button>
        <Button variant="secondary" onClick={() => closeDialog(undefined)}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export const useUnstakeTokenDialog = () => {
  return useDialog(UnstakeTokenDialog);
};
