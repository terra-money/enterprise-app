interface TxEvent {
  type: string;
  attributes: {
    key: string;
    value: string;
  }[];
}

interface TxLog {
  msg_index: number;
  log: string;
  events: TxEvent[];
}

type Message = any;

interface Tx {
  body: {
    messages: Message[];
    memo?: string;
  };
  auth_info: {
    fee: any;
  };
}

export interface TxResponse {
  height: number;
  txhash: string;
  raw_log: string;
  logs: TxLog[] | undefined;
  gas_wanted: number;
  gas_used: number;
  tx: Tx;
  timestamp: string;
  code?: number | undefined;
  codespace?: string | undefined;
}
