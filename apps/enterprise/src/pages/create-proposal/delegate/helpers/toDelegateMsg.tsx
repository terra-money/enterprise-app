import { microfy } from '@terra-money/apps/libs/formatting';
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
          amount: microfy(amount, tokenDecimals).toString(),
        },
        validator: address,
      }
    },
  }
  return JSON.stringify(msg);
};
