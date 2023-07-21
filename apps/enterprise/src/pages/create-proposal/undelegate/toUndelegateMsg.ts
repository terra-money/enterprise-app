import { toChainAmount } from 'chain/utils/toChainAmount';
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
          amount: toChainAmount(amount, lunaDecimals),
        },
      },
    },
  };

  return JSON.stringify(msg);
};
