import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { CW20TokenInfoResponse, useCW20TokenInfoQuery } from 'queries';

interface Props {
  children: React.ReactNode;
}

const { provider: TokenProvider, useValue: useCurrentDaoToken } =
  getValueProviderSetup<CW20TokenInfoResponse>('CurrentDAOToken');

export { useCurrentDaoToken };

export const CurrentDAOTokenProvider = ({ children }: Props) => {
  const dao = useCurrentDao();

  const { data } = useCW20TokenInfoQuery(dao.dao_membership_contract);

  if (!data) {
    return <Throbber />;
  }

  return <TokenProvider value={data}>{children}</TokenProvider>;
};
