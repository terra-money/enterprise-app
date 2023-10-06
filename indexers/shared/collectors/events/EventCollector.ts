import { State } from '../../services/state';
import { Logger } from '../../utils';
import { Block, BlockListener, Log, Event as WasmEvent } from '../../services/block-listener';
import { EventStore, Event } from '../../services/event-store';
import { Runnable } from '../../services/runnable';
import { Epoch } from '../../types';
import { groupAttributes } from './groupAttributes';
import { serialize } from './serialize';
import { TxEvent } from './types';

type MonikerCallback = (contractAddress: string, payload: TxEvent) => string | undefined;

type EventCallback = (event: Event) => void;

interface EventCollectorOptions {
  genesis: Epoch;
  blockListener: BlockListener;
  eventStore: EventStore;
  state: State;
  monikers: MonikerCallback;
  onEvent?: EventCallback;
}

export class EventCollector implements Runnable {
  private readonly genesis: Epoch;
  private readonly blockListener: BlockListener;
  private readonly monikers: MonikerCallback;
  private readonly eventStore: EventStore;
  private readonly state: State;
  private readonly logger: Logger;
  private readonly onEvent?: EventCallback;

  constructor(options: EventCollectorOptions) {
    this.logger = new Logger('EventCollector');
    this.genesis = options.genesis;
    this.blockListener = options.blockListener;
    this.eventStore = options.eventStore;
    this.state = options.state;
    this.monikers = options.monikers;
    this.onEvent = options.onEvent;
  }

  private findWasmEvent = (log: Log): WasmEvent => {
    return log.events.find((event) => event.type === 'wasm');
  };

  private map = (block: Block): Event[] => {
    const events: Event[] = [];
    block.txs.forEach((tx) => {
      tx.logs.forEach((log) => {
        log.events.forEach((event) => {
          if (event.type !== 'wasm') return;

          groupAttributes(event.attributes).forEach((group, index) => {
            const payload = serialize(group);
            const contract = this.monikers(payload['_contract_address'], payload);
            if (!contract) return;

            const event = {
              contract: this.monikers(payload['_contract_address'], payload),
              action: payload.action,
              height: block.height,
              txHash: tx.txHash,
              msgIndex: log.msgIndex,
              eventIndex: index,
              timestamp: tx.timestamp,
              payload: payload,
            };

            events.push(event);
          });
        });
      });
    });

    if (this.onEvent) {
      events.forEach((event) => this.onEvent(event));
    }

    return events;
  };

  run = async (): Promise<void> => {
    let { height } = await this.state.get(this.genesis);

    this.logger.info(`Starting from height ${height}`);

    await this.blockListener.listen(height, async (block) => {
      const events = this.map(block);

      if (events.length > 0) {
        this.logger.info(`Found ${events.length} at height ${block.height}`);
        await this.eventStore.save(events);
      }

      if (events.length > 0 || block.height % 100 === 0) {
        // some indexers are triggered when there are new
        // events so we only update this when their are events
        // or periodically for restoration purposes
        await this.state.set({
          height: block.height,
          timestamp: block.timestamp,
        });
      }
    });
  };
}
