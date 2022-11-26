import { Timestamp } from "types";

export interface EventPK {
  contract: string;
  action: string;
}

export interface EventSK {
  height: number;
  txHash: string;
  msgIndex: number;
  eventIndex: number;
}

export interface Event extends EventPK, EventSK {
  timestamp: number;
  payload: any;
}

export type QueryResponse<TEvent> = {
  events: TEvent[];
  next: any;
};

export type QueryOptions = {
  limit?: number;
  next?: any;
  forward?: boolean;
};

export interface EventStore {
  save(events: Array<Event>): Promise<void>;

  getBetweenBlocks<TEvent extends Event>(
    pk: EventPK,
    from: number,
    to: number,
    options?: QueryOptions
  ): Promise<QueryResponse<TEvent>>;

  getBetweenTimeRange<TEvent extends Event>(
    pk: EventPK,
    from: Timestamp,
    to: Timestamp,
    options?: QueryOptions
  ): Promise<QueryResponse<TEvent>>;
}
