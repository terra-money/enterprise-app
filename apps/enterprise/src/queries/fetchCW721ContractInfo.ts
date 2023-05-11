import { LCDClient } from '@terra-money/feather.js';

export interface CW721ContractInfoResponse {
  name: string;
  symbol: string;
}

export const fetchCW721ContractInfo = async (
  lcd: LCDClient,
  nftAddress: string
): Promise<CW721ContractInfoResponse> => {
  const response = await lcd.wasm.contractQuery<CW721ContractInfoResponse>(nftAddress, {
    contract_info: {},
  });

  return response;
};
