import { LCDClient } from "@terra-money/feather.js";
import { Big } from "big.js";
import { u } from "../../types";

interface CW20BalanceResponse {
  balance: u<Big>;
}

export const fetchCW20Balance = async (
  lcd: LCDClient,
  walletAddr: string,
  tokenAddr: string
): Promise<u<Big>> => {
  const response = await lcd.wasm.contractQuery<CW20BalanceResponse>(
    tokenAddr,
    {
      balance: {
        address: walletAddr,
      },
    }
  );

  return Big(response?.balance ?? 0) as u<Big>;
};
