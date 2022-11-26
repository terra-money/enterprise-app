import { makeTableName } from "utils";

export class TableNames {
  static state() {
    return makeTableName("state");
  }
  static events() {
    return makeTableName("events");
  }
}
