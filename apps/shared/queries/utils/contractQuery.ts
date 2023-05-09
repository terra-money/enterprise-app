import { NetworkInfo } from "@terra-money/wallet-provider";
import { LCDClient } from "@terra-money/feather.js";
import { CW20Addr } from "../../types";
import { getNetworkOrLCD } from "./getNetworkOrLCD";

export const contractQuery = async <QueryMsg extends {}, QueryResponse>(
  networkOrLCD: NetworkInfo | LCDClient,
  contractAddress: CW20Addr,
  msg: QueryMsg,
  defaultValue?: QueryResponse
): Promise<QueryResponse> => {
  const lcd = getNetworkOrLCD(networkOrLCD);

  try {
    return await lcd.wasm.contractQuery<QueryResponse>(contractAddress, msg);
  } catch (err) {
    //console.log(err);
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw err;
  }
};
