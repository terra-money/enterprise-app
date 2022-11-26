import { parseQueryString } from "@apps-shared/api/utils";
import { QueryParamConfigMap, StringParam } from "serialize-query-params";
import { ParsedQs } from "qs";

interface QueryStringParameters {
  type: "state" | undefined;
}

export const parseQueryParameters = (
  query: ParsedQs
): QueryStringParameters => {
  const definition: QueryParamConfigMap = {
    type: StringParam,
  };
  return parseQueryString<QueryStringParameters>(query, definition);
};
