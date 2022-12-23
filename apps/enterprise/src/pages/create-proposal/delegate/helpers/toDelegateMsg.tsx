import { microfy } from '@terra-money/apps/libs/formatting';

interface DelegateMsgParams {
  amount: number;
  address: string;
  tokenDecimals: number;
}

export const toDelegateMsg = ({ amount, address, tokenDecimals }: DelegateMsgParams) => {
  return JSON.stringify({
    staking: {
      delegate: {
        amount: [
          {
            denom: 'uluna',
            amount: microfy(amount, tokenDecimals).toString(),
          },
        ],
        validator: address,
      },
    },
  });
};
