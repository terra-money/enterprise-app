import { LCDClient, TxInfo } from '@terra-money/feather.js';
import { CancellationToken, None } from 'chain/transactions/cancellation';
import { sleep } from '../utils/sleep';

export class TxTimeoutError extends Error {
  constructor(message: string, readonly txhash: string) {
    super(message);
    this.name = 'PollingTimeout';
  }

  toString = () => {
    return `[${this.name} txhash="${this.txhash}" message="${this.message}"]`;
  };
}

export const pollTx = async function (
  lcd: LCDClient,
  txHash: string,
  cancellationToken: CancellationToken = None,
  chainID: string
): Promise<TxInfo | Error> {
  const timeout = Date.now() + 20 * 1000;

  while (Date.now() < timeout && cancellationToken.cancelled() === false) {
    try {
      return await lcd.tx.txInfo(txHash, chainID);
    } catch (error: any) {
      if ([400, 404].includes(error.response.status)) {
        // the tx was not yet found so try again after a delay
        await sleep(500, cancellationToken);
        continue;
      }
      return new Error(error);
    }
  }

  return new TxTimeoutError(
    `Transaction queued. To verify the status, please check the transaction hash below.`,
    txHash
  );
};
