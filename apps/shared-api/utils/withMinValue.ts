import { QueryParamConfig } from "serialize-query-params";

export const withMinValue = (
  param: QueryParamConfig<number, number>,
  min: number
): QueryParamConfig<number, number> => {
  const decode = (...args: Parameters<typeof param.decode>) => {
    const decodedValue = param.decode(...args);
    return Math.max(min, decodedValue);
  };
  return {
    ...param,
    decode,
  };
};
