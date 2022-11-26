import { DialogProps, useDialog } from '@terra-money/apps/hooks';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from 'components/dialog';
import { NumericPanel } from 'components/numeric-panel';
import { Button } from 'components/primitives';
import { useUnstakeNFTForm } from './useUnstakeNFTForm';
import { useUnstakeNFTTx } from 'tx';
import styles from './UnstakeNFTDialog.module.sass';

interface UnstakeNFTDialogProps {
  walletAddress: string;
  daoAddress: string;
  staked: string[];
  symbol: string;
}

const UnstakeNFTDialog = (props: DialogProps<UnstakeNFTDialogProps>) => {
  const { daoAddress, staked, symbol, closeDialog } = props;

  const [, { submitDisabled }] = useUnstakeNFTForm({ staked });

  const [txResult, unstakeNFTTx] = useUnstakeNFTTx();

  return (
    <Dialog className={styles.root}>
      <DialogHeader title="Unstake your NFTs" onClose={() => closeDialog(undefined, { closeAll: true })} />
      <DialogBody className={styles.body}>
        <NumericPanel title="Currently staking" value={staked.length} suffix={symbol} />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          disabled={submitDisabled}
          loading={txResult.loading}
          onClick={async () => {
            if (submitDisabled === false) {
              await unstakeNFTTx({
                daoAddress,
                tokens: staked,
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

export const useUnstakeNFTDialog = () => {
  return useDialog(UnstakeNFTDialog);
};
