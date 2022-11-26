import { QueryParamConfig } from "serialize-query-params";

export const withMaxValue = (
  param: QueryParamConfig<number, number>,
  max: number
): QueryParamConfig<number, number> => {
  const decode = (...args: Parameters<typeof param.decode>) => {
    const decodedValue = param.decode(...args);
    return Math.min(max, decodedValue);
  };
  return {
    ...param,
    decode,
  };
};
