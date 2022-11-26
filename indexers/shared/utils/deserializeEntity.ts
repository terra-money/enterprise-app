import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { omit } from "lodash";

export const deserializeEntity = <Entity>(
  attributes: Record<string, AttributeValue>
): Entity => {
  return omit(unmarshall(attributes), ["pk", "sk"]) as Entity;
};
