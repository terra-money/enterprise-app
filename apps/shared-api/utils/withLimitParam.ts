import { withMaxValue } from './withMaxValue';
import { withMinValue } from './withMinValue';
import { NumberParam, withDefault } from 'serialize-query-params';

export const withLimitParam = (limit: number = 1000, min: number = 1, max: number = 1000) => {
  return withMaxValue(withMinValue(withDefault(NumberParam, limit), min), max);
};
