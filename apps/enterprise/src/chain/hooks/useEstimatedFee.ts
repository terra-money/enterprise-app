import { useLCDClient } from '@terra-money/wallet-provider';
import { QUERY_KEY } from 'queries';
import { useQuery } from 'react-query';
import { useAssertMyAddress } from './useAssertMyAddress';
import { Msg } from '@terra-money/terra.js';
import { demicrofy } from '@terra-money/apps/libs/formatting';
import { lunaDecimals } from 'chain/constants';

export const useEstimatedFeeQuery = (msgs: Msg[]) => {
  const address = useAssertMyAddress();

  const client = useLCDClient();

  return useQuery([QUERY_KEY.ESTIMATED_FEE, msgs], async () => {
    const { auth_info } = await client.tx.create([{ address }], {
      msgs,
    });

    const ulunaAmount = auth_info.fee.amount.toArray().find((coin) => coin.denom === 'uluna')?.amount;
    if (!ulunaAmount) {
      throw new Error('Failed to get fee amount');
    }
    return demicrofy(ulunaAmount.toNumber(), lunaDecimals);
  });
};
