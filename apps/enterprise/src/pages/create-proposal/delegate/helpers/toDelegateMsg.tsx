import { microfy } from '@terra-money/apps/libs/formatting';

interface DelegateMsgParams {
  amount: number;
  address: string;
  tokenDecimals: number;
}

export interface DelegateMsg {
  validator: string;
  amount: {
    denom: string;
    amount: string;
  };
}

export const toDelegateMsg = ({ amount, address, tokenDecimals }: DelegateMsgParams) => {
  const delegate: DelegateMsg = {
    amount: {
      denom: 'uluna',
      amount: microfy(amount, tokenDecimals).toString(),
    },
    validator: address,
  };
  return JSON.stringify({
    staking: {
      delegate,
    },
  });
};
