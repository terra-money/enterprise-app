import { Attribute } from '../../services/block-listener';

export const groupAttributes = (attributes: Array<Attribute>): Array<Array<Attribute>> => {
  // Step 1: Create groups delimited by _contract_address
  let groups: Array<Array<Attribute>> = [];
  let currentGroup: Array<Attribute> = [];

  attributes.forEach((attribute) => {
    if (attribute.key === '_contract_address') {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = [attribute];
    } else {
      currentGroup.push(attribute);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  // Step 2: Merge groups that have the same _contract_address
  let result: Array<Array<Attribute>> = [];
  let groupMap: { [key: string]: Array<Attribute> } = {};

  groups.forEach((group) => {
    let contractAddress = group.find((attribute) => attribute.key === '_contract_address')?.value;
    if (contractAddress) {
      if (!groupMap[contractAddress]) {
        groupMap[contractAddress] = [];
      }
      group.forEach((attribute) => {
        if (attribute.key !== '_contract_address' || groupMap[contractAddress].length === 0) {
          groupMap[contractAddress].push(attribute);
        }
      });
    }
  });

  Object.values(groupMap).forEach((group) => {
    result.push(group);
  });
  return result;
};
