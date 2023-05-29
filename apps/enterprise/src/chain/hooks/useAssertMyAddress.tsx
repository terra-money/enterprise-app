import { assertDefined } from '@terra-money/apps/utils';
import { useMyAddress } from './useMyAddress';

export const useAssertMyAddress = () => {
  const myAddress = useMyAddress();

  return assertDefined(myAddress, 'myAddress');
};
