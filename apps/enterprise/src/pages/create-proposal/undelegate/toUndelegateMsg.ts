import { microfy } from '@terra-money/apps/libs/formatting';
import { lunaDecimals } from 'chain/constants';

interface DelegateMsgParams {
  amount: number;
  address: string;
}

export interface UndelegateMsg {
  amount: [{
    denom: string;
    amount: string;
  }];
  validator: string;
}

export const toUndelegateMsg = ({ amount, address }: DelegateMsgParams) => {
  const undelegate: UndelegateMsg = {
    amount: [{
      denom: 'uluna',
      amount: microfy(amount, lunaDecimals).toString(),
    }],
    validator: address,
  }
  return JSON.stringify({
    staking: {
      undelegate,
    },
  });
};
