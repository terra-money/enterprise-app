import {
  CW20TokensResponse,
  IBCTokensResponse,
  TokensResponse,
} from "../../types";

export const fixTokenResponse = <
  T extends IBCTokensResponse | CW20TokensResponse | TokensResponse
>(
  type: "cw20" | "ibc",
  tokens: T,
  accessor: (key: string) => string = (k) => k
) => {
  return Object.keys(tokens).reduce((prev, current) => {
    const key = accessor(current);
    return {
      ...prev,
      [key]: {
        ...tokens[current],
        type,
        key,
        // decimals are optional in the responses but its much easier for us not to worry
        // about optionality within the app so we can standardize the default here
        decimals:
          tokens[current].decimals === undefined ||
          tokens[current].decimals === 0
            ? 6
            : tokens[current].decimals,
      },
    };
  }, {});
};
