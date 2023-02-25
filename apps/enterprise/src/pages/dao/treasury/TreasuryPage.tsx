import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { TreasuryOverview } from '../TreasuryOverview';
import { TxItem } from './TxItem';
import { useTxsQuery } from 'queries/useTxsQuery';
import { CW20Addr } from '@terra-money/apps/types';
import styles from './TreasuryPage.module.sass';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';

export const TreasuryPage = () => {
  const dao = useCurrentDao();

  const { data: txs } = useTxsQuery((dao?.address || '') as CW20Addr);

  return (
    <Container direction="column" gap={32} className={styles.root}>
      {dao && <TreasuryOverview />}
      <Container direction="column" gap={16}>
        <Text variant="heading4">Transactions</Text>
        <Container gap={16} direction="column">
          {txs ? (txs.map((tx) => <TxItem tx={tx} />)) : (
            <Container className={styles.noTransactionsToDisplay}>
              <Text className={styles.noTransactionsLabel} variant="label">
                No transactions have been completed with the treasury.
              </Text>
            </Container>
          )}
        </Container>
      </Container>
    </Container>
  );
};
