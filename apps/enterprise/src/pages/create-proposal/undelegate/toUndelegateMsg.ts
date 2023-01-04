import { microfy } from '@terra-money/apps/libs/formatting';
import { lunaDecimals } from 'chain/constants';

interface DelegateMsgParams {
  amount: number;
  address: string;
}

export const toUndelegateMsg = ({ amount, address }: DelegateMsgParams) => {
  return JSON.stringify({
    staking: {
      undelegate: {
        amount: {
          denom: 'uluna',
          amount: microfy(amount, lunaDecimals),
        },
        validator: address,
      },
    },
  });
};
