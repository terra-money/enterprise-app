import {
  parseQueryString,
  withLimitParam,
  withDirectionParam,
  Direction,
} from "@apps-shared/api/utils";
import { QueryParamConfigMap } from "serialize-query-params";
import { ParsedQs } from "qs";

interface QueryStringParameters {
  direction: Direction;
  limit: number;
}

export const parseQueryParameters = (
  query: ParsedQs
): QueryStringParameters => {
  const definition: QueryParamConfigMap = {
    direction: withDirectionParam(),
    limit: withLimitParam(),
  };

  return parseQueryString<QueryStringParameters>(query, definition);
};
