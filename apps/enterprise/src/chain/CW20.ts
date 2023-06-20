export interface MintCW20Msg {
  mint: {
    recipient: string,
    amount: string,
  }
}

export interface TransferCW20Msg {
  transfer: {
    recipient: string,
    amount: string,
  }
}

export interface BurnCW20Msg {
  burn: {
    amount: string
  }
}

export type CW20Msg = MintCW20Msg | TransferCW20Msg | BurnCW20Msg