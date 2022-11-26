import {
  decodeQueryParams,
  EncodedQuery,
  QueryParamConfigMap,
} from "serialize-query-params";
import { ParsedQs } from "qs";

export const parseQueryString = <Params>(
  query: ParsedQs,
  definition: QueryParamConfigMap,
  validator: (params: Params) => Params = (p) => p
): Params => {
  const params = decodeQueryParams(definition, query as EncodedQuery) as Params;

  return validator(params);
};
