export interface CosmWasmCoin {
  denom: string;
  amount: string;
}

export interface BankSendMsg {
  bank: {
    send: {
      to_address: string;
      amount: CosmWasmCoin[];
    }
  }
}

export interface DelegateMsg {
  staking: {
    delegate: {
      validator: string,
      amount: CosmWasmCoin,
    }
  }
}

export interface UndelegateMsg {
  staking: {
    undelegate: {
      validator: string,
      amount: CosmWasmCoin,
    }
  }
}

export interface RedelegateMsg {
  staking: {
    redelegate: {
      src_validator: string,
      dst_validator: string,
      amount: CosmWasmCoin,
    }
  }
}

export interface WasmExecuteMsg {
  wasm: {
    execute: {
      contract_addr: string;
      msg: string;
      funds: CosmWasmCoin[];
    }
  }
}

export interface WasmInstantiateMsg {
  wasm: {
    instantiate: {
      msg: string;
    }
  }
}

export interface WasmMigrateMsg {
  wasm: {
    migrate: {
      msg: string;
    }
  }
}

export type CosmWasmMsg = BankSendMsg | DelegateMsg | UndelegateMsg | RedelegateMsg | WasmExecuteMsg | WasmInstantiateMsg | WasmMigrateMsg