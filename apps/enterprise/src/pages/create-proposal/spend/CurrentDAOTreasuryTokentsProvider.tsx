import { getValueProviderSetup } from '@terra-money/apps/utils';
import { Throbber } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { TreasuryToken, useTreasuryTokensQuery } from 'queries';

interface Props {
  children: React.ReactNode;
}

const { provider: TreasuryTokensProvider, useValue: useCurrentDaoTreasuryTokens } =
  getValueProviderSetup<TreasuryToken[]>('TreasuryTokens');

export { useCurrentDaoTreasuryTokens };

export const CurrentDAOTreasuryTokensProvider = ({ children }: Props) => {
  const dao = useCurrentDao();

  const { data: treasuryTokens } = useTreasuryTokensQuery(dao.enterprise_factory_contract);

  if (!treasuryTokens) {
    return <Throbber />;
  }

  return <TreasuryTokensProvider value={treasuryTokens}>{children}</TreasuryTokensProvider>;
};
