import { microfy } from '@terra-money/apps/libs/formatting';
import { lunaDecimals } from 'chain/constants';

interface UndelegateMsgParams {
  amount: number;
  oldAddress: string;
  newAddress: string;
}

export interface RedelegateMsg {
  amount: [
    {
      amount: string;
      denom: string;
    },
  ]
  src_validator: string;
  dst_validator: string;

}

export const toRedelegateMsg = ({ amount, oldAddress, newAddress }: UndelegateMsgParams) => {
  const redelegate: RedelegateMsg = {
    amount: [
      {
        amount: microfy(amount, lunaDecimals).toString(),
        denom: 'uluna',
      },
    ],
    src_validator: oldAddress,
    dst_validator: newAddress,
  }

  return JSON.stringify({
    staking: {
      redelegate
    },
  });
};
