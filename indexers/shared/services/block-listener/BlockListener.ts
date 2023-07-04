import { BlockInfo, TxInfo, LCDClient, hashToHex } from '@terra-money/feather.js';
import axios from 'axios';
import { Timestamp } from 'types';
import { Logger, sleep } from 'utils';
import { Block } from './types';
import { assertEnvVar } from 'utils/assertEnvVar';
import { retry } from 'utils/retry';

type AsyncCallback = (block: Block) => Promise<void>;

type BlockListenerOptions = {
  lcd: LCDClient;
};

export class BlockListener {
  private readonly logger: Logger;
  private readonly lcd: LCDClient;

  constructor(options: BlockListenerOptions) {
    this.logger = new Logger('BlockListener');
    this.lcd = options.lcd;
  }

  private wait = async (height: number): Promise<[BlockInfo, TxInfo[]]> => {
    this.logger.info(`Process block with height=${height}`);

    const chainId = assertEnvVar('CHAIN_ID');

    while (true) {
      try {
        const blockInfo = await this.lcd.tendermint.blockInfo(chainId, height);

        if (blockInfo === null || blockInfo === undefined) {
          await sleep(1000);
          continue;
        }

        const txs: TxInfo[] = [];
        const rawTxs = blockInfo.block.data.txs || [];
        await Promise.all(
          rawTxs.map(async (tx) => {
            const txHash = hashToHex(tx);
            try {
              const info = await retry({
                func: () => this.lcd.tx.txInfo(txHash, chainId),
                retryInterval: 10000,
              });
              txs.push(info);
            } catch (err) {
              this.logger.error(`Error fetching info for transaction with hash=${txHash}`, err);
            }
          })
        );

        return [blockInfo, txs];
      } catch (err) {
        if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
          // likely the block doesn't exist so we skip writing this as an error
          await sleep(1000);
          continue;
        }
        this.logger.error(`Error waiting for block ${height} "${err.toString()}"`);
        await sleep(1000);
      }
    }
  };

  private fetchBlock = async (height: number): Promise<Block> => {
    const [blockInfo, txs] = await this.wait(height);

    return {
      height: height,
      timestamp: Timestamp.from(blockInfo.block.header.time).toNumber(),
      txs: txs
        .filter((tx) => tx.logs)
        .map((tx) => {
          return {
            txHash: tx.txhash,
            timestamp: Timestamp.from(tx.timestamp).toNumber(),
            logs: tx.logs.map((log) => {
              return {
                msgIndex: log.msg_index,
                events: log.events,
              };
            }),
          };
        }),
    };
  };

  listen = async (height: number, callback: AsyncCallback) => {
    while (true) {
      const block = await this.fetchBlock(height);
      try {
        await callback(block);
        height++;
      } catch (error) {
        this.logger.error('Failed to execute the callback');
        await sleep(1000);
      }
    }
  };
}
