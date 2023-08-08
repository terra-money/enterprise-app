import { toChainAmount } from 'chain/utils/toChainAmount';
import { DelegateMsg } from 'chain/CosmWasm';

interface DelegateMsgParams {
  amount: number;
  address: string;
  tokenDecimals: number;
}

export const toDelegateMsg = ({ amount, address, tokenDecimals }: DelegateMsgParams) => {
  const msg: DelegateMsg = {
    staking: {
      delegate: {
        amount: {
          denom: 'uluna',
          amount: toChainAmount(amount, tokenDecimals),
        },
        validator: address,
      },
    },
  };
  return JSON.stringify(msg);
};
