import { useMedia } from 'react-use';
import { getCSSUnit } from '../utils';

export const useIsScreenWidthLessThan = (width: number | string) => {
  return useMedia(`(max-width: ${getCSSUnit(width)})`, false);
};
