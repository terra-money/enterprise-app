import { Token } from "../types";
import { useTokens } from "./useTokens";

type Addr = string;

type AssetInfoBaseFor_Addr =
  | {
      native: string;
    }
  | {
      cw20: Addr;
    }
  | {
      /**
       * @minItems 2
       * @maxItems 2
       */
      cw1155: [Addr, string];
    };

export const useToken = (
  asset: AssetInfoBaseFor_Addr | string | undefined,
  defaultToken?: Token
): Token | undefined => {
  const { tokens } = useTokens();

  const key =
    asset === undefined
      ? undefined
      : typeof asset === "string"
      ? asset
      : "native" in asset
      ? asset.native
      : "cw20" in asset
      ? asset.cw20
      : undefined;

  if (key === undefined) {
    return undefined;
  }

  return tokens[key] ?? defaultToken;
};
