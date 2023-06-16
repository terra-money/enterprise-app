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

  // Step 2: Merge groups that have the same _contract_address and where one of the groups does not have an action key defined
  let result: Array<Array<Attribute>> = [];
  let groupMap: { [key: string]: Array<Attribute> } = {};
  groups.forEach((group) => {
    let contractAddress = group.find((attribute) => attribute.key === '_contract_address')?.value;
    let hasActionKey = group.some((attribute) => attribute.key === 'action');
    if (contractAddress) {
      let groupKey = `${contractAddress}`;
      if (!groupMap[groupKey]) {
        groupMap[groupKey] = [];
      }
      if (
        !hasActionKey ||
        groupMap[groupKey].length === 0 ||
        !groupMap[groupKey].some((attribute) => attribute.key === 'action')
      ) {
        group.forEach((attribute) => {
          if (attribute.key !== '_contract_address' || groupMap[groupKey].length === 0) {
            groupMap[groupKey].push(attribute);
          }
        });
      } else {
        result.push(group);
      }
    }
  });

  Object.values(groupMap).forEach((group) => {
    result.push(group);
  });
  return result;
};
