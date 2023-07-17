import { assertDefined } from 'lib/shared/utils/assertDefined';
import { useParams } from 'react-router';

export const useCurrentDaoAddress = () => {
  const { address } = useParams<{ address: string }>();

  return assertDefined(address);
};
