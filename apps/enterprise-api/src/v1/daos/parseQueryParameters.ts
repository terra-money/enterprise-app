import {
  Direction,
  parseQueryString,
  withDirectionParam,
  withLimitParam,
} from "@apps-shared/api/utils";
import { QueryParamConfigMap, StringParam } from "serialize-query-params";
import { ParsedQs } from "qs";

interface QueryStringParameters {
  query?: string;
  limit: number;
  direction: Direction;
}

export const parseQueryParameters = (
  query: ParsedQs
): QueryStringParameters => {
  const definition: QueryParamConfigMap = {
    query: StringParam,
    limit: withLimitParam(),
    direction: withDirectionParam(),
  };

  const validation = (params: QueryStringParameters): QueryStringParameters => {
    return params;
  };

  return parseQueryString<QueryStringParameters>(query, definition, validation);
};
