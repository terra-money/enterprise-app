import { withDefault, createEnumParam } from "serialize-query-params";

export type Direction = "asc" | "desc";

export const withDirectionParam = (direction: Direction = "asc") => {
  return withDefault(createEnumParam(["asc", "desc"]), direction);
};
