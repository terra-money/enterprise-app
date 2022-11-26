import { NetworkInfo } from '@terra-money/wallet-provider';
import { getNetworkOrLCD } from '@terra-money/apps/queries';

export interface MultisigVoter {
  addr: string;
  weight: number;
}

export interface CW3ListVotersResponse {
  voters: Array<MultisigVoter>;
}

export const fetchCW3ListVoters = async (network: NetworkInfo, address: string): Promise<Array<MultisigVoter>> => {
  const lcd = getNetworkOrLCD(network);

  const response = await lcd.wasm.contractQuery<CW3ListVotersResponse>(address, {
    list_voters: {},
  });

  return response.voters;
};
