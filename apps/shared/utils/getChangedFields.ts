import { isEqual } from 'lodash';

export function getChangedFields<T extends {}>(oldObject: T, newObject: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in newObject) {
    const oldValue = oldObject[key];
    const newValue = newObject[key];

    if (!isEqual(oldValue, newValue)) {
      result[key] = newValue;
    }
  }

  return result;
}
