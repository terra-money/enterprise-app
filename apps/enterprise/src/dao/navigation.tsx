import { assertDefined } from '@terra-money/apps/utils';
import { useParams } from 'react-router';

export const useCurrentDaoAddress = () => {
  const { address } = useParams<{ address: string }>();

  return assertDefined(address);
};
