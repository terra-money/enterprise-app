import { microfy } from '@terra-money/apps/libs/formatting';
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
          amount: microfy(amount, lunaDecimals).toString(),
          denom: 'uluna',
        },
        src_validator: oldAddress,
        dst_validator: newAddress,
      }
    }
  };

  return JSON.stringify(msg);
};
