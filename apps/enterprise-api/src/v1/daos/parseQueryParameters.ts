import {
  Direction,
  parseQueryString,
  withDirectionParam,
  withLimitParam,
} from "@apps-shared/api/utils";
import { QueryParamConfigMap, StringParam } from "serialize-query-params";
import { ParsedQs } from "qs";
import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface QueryStringParameters {
  query?: string;
  limit: number;
  direction: Direction;
  start_after?: Record<string, AttributeValue>;
}

export const parseQueryParameters = (
  query: ParsedQs
): QueryStringParameters => {
  const definition: QueryParamConfigMap = {
    query: StringParam,
    limit: withLimitParam(),
    direction: withDirectionParam(),
    start_after: StringParam
  };

  const validation = (params: QueryStringParameters): QueryStringParameters => {
    return params;
  };

  return parseQueryString<QueryStringParameters>(query, definition, validation);
};
