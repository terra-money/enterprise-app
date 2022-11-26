import { withDefault, createEnumParam } from "serialize-query-params";
import { Frequency } from "utils";

export const withFrequencyParam = (frequency: Frequency = "daily") => {
  return withDefault(
    createEnumParam(["monthly", "daily", "hourly"]),
    frequency
  );
};
