import { microfy } from '@terra-money/apps/libs/formatting';
import { lunaDecimals } from 'chain/constants';

interface UndelegateMsgParams {
  amount: number;
  oldAddress: string;
  newAddress: string;
}

export const toRedelegateMsg = ({ amount, oldAddress, newAddress }: UndelegateMsgParams) => {
  return JSON.stringify({
    staking: {
      redelegate: {
        amount: {
          denom: 'uluna',
          amount: microfy(amount, lunaDecimals),
        },
        src_validator: oldAddress,
        dst_validator: newAddress,
      },
    },
  });
};
