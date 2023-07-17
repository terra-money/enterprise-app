import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useMyAddress } from './useMyAddress';

export const useAssertMyAddress = () => {
  const myAddress = useMyAddress();

  return assertDefined(myAddress, 'myAddress');
};
