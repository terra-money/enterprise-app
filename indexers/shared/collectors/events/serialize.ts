import { Attribute } from "../../services/block-listener";
import { TxEvent } from "./types";

export const serialize = (attributes: Array<Attribute>): TxEvent => {
  const object = {};
  attributes.forEach((attribute) => {
    const keys = Object.keys(object).filter((key) => key === attribute.key);
    const key =
      keys.length === 0 ? attribute.key : `${attribute.key}_${keys.length + 1}`;
    object[key] = attribute.value === undefined ? null : attribute.value;
  });
  return object as TxEvent;
};
