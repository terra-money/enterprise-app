import { Attribute } from "../../services/block-listener";

export const groupAttributes = (
  attributes: Array<Attribute>
): Array<Array<Attribute>> => {
  return attributes.reduce((previous, current) => {
    if (current.key === "_contract_address") {
      previous.push([]);
    }
    if (previous.length > 0) {
      previous[previous.length - 1].push(current);
    }
    return previous;
  }, []);
};
