import { DialogProps, useDialog } from '@terra-money/apps/hooks';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from 'components/dialog';
import { NumericPanel } from 'components/numeric-panel';
import { Button } from 'components/primitives';
import { useStakeNFTForm } from './useStakeNFTForm';
import { useStakeNFTTx } from 'tx';
import styles from './StakeNFTDialog.module.sass';

interface StakeNFTDialogProps {
  walletAddress: string;
  daoAddress: string;
  tokenAddress: string;
  tokens: string[];
  staked: string[];
  symbol: string;
}

const StakeNFTDialog = (props: DialogProps<StakeNFTDialogProps>) => {
  const { daoAddress, tokenAddress, tokens, staked, symbol, closeDialog } = props;

  const [, { submitDisabled }] = useStakeNFTForm({ tokens });

  const [txResult, stakeNFTTx] = useStakeNFTTx();

  return (
    <Dialog className={styles.root}>
      <DialogHeader title="Stake your NFTs" onClose={() => closeDialog(undefined, { closeAll: true })} />
      <DialogBody className={styles.body}>
        <NumericPanel title="Currently staking" value={staked.length} suffix={symbol} />
        <NumericPanel title="NFTs in wallet" value={tokens.length} suffix={symbol} />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          disabled={submitDisabled}
          loading={txResult.loading}
          onClick={async () => {
            if (submitDisabled === false) {
              await stakeNFTTx({
                daoAddress,
                tokenAddress,
                tokens,
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

export const useStakeNFTDialog = () => {
  return useDialog(StakeNFTDialog);
};
