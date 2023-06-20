import { microfy } from '@terra-money/apps/libs/formatting';
import { UndelegateMsg } from 'chain/CosmWasm';
import { lunaDecimals } from 'chain/constants';

interface DelegateMsgParams {
  amount: number;
  address: string;
}

export const toUndelegateMsg = ({ amount, address }: DelegateMsgParams) => {
  const msg: UndelegateMsg = {
    staking: {
      undelegate: {
        validator: address,
        amount: {
          denom: 'uluna',
          amount: microfy(amount, lunaDecimals).toString(),
        },
      },
    },
  }

  return JSON.stringify(msg);
};
