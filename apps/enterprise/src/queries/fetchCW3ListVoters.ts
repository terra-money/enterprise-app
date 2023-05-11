import { LCDClient } from '@terra-money/feather.js';

export interface MultisigVoter {
  addr: string;
  weight: number;
}

export interface CW3ListVotersResponse {
  voters: Array<MultisigVoter>;
}

export const fetchCW3ListVoters = async (lcd: LCDClient, address: string): Promise<Array<MultisigVoter>> => {
  const response = await lcd.wasm.contractQuery<CW3ListVotersResponse>(address, {
    list_voters: {},
  });

  return response.voters;
};
