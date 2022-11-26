import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { omit } from "lodash";

export const deserializeEntity = <Entity>(
  attributes: Record<string, AttributeValue>,
  ignoreProperties: string[] = []
): Entity => {
  return omit(unmarshall(attributes), [
    "pk",
    "sk",
    ...ignoreProperties,
  ]) as Entity;
};
