import { toChainAmount } from 'chain/utils/toChainAmount';
import { RedelegateMsg } from 'chain/CosmWasm';
import { lunaDecimals } from 'chain/constants';

interface UndelegateMsgParams {
  amount: number;
  oldAddress: string;
  newAddress: string;
}

export const toRedelegateMsg = ({ amount, oldAddress, newAddress }: UndelegateMsgParams) => {
  const msg: RedelegateMsg = {
    staking: {
      redelegate: {
        amount: {
          amount: toChainAmount(amount, lunaDecimals),
          denom: 'uluna',
        },
        src_validator: oldAddress,
        dst_validator: newAddress,
      },
    },
  };

  return JSON.stringify(msg);
};
