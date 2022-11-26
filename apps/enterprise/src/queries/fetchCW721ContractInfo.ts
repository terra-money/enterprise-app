import { NetworkInfo } from '@terra-money/wallet-provider';
import { getNetworkOrLCD } from '@terra-money/apps/queries';

export interface CW721ContractInfoResponse {
  name: string;
  symbol: string;
}

export const fetchCW721ContractInfo = async (
  network: NetworkInfo,
  nftAddress: string
): Promise<CW721ContractInfoResponse> => {
  const lcd = getNetworkOrLCD(network);

  const response = await lcd.wasm.contractQuery<CW721ContractInfoResponse>(nftAddress, {
    contract_info: {},
  });

  return response;
};
