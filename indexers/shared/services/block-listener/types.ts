export interface Attribute {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: Array<Attribute>;
}

export interface Log {
  events: Array<Event>;
  msgIndex: number;
}

export interface Tx {
  txHash: string;
  timestamp: number;
  logs: Array<Log>;
}

export interface Block {
  height: number;
  timestamp: number;
  txs: Array<Tx>;
}
