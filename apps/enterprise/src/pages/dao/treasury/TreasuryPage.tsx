import { Container } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import { TreasuryOverview } from '../TreasuryOverview';
import { TxItem } from './TxItem';
import { useTxsQuery } from 'queries/useTxsQuery';
import { CW20Addr } from '@terra-money/apps/types';
import styles from './TreasuryPage.module.sass';
import { useCurrentDaoAddress } from 'dao/navigation';
import { DaoErrorBoundary } from '../DaoErrorBoundary';

export const TreasuryPage = () => {
  const address = useCurrentDaoAddress();

  const { data: txs } = useTxsQuery(address as CW20Addr);

  return (
    <DaoErrorBoundary>
      <Container direction="column" gap={32} className={styles.root}>
        <TreasuryOverview />
        <Container direction="column" gap={16}>
          <Text variant="heading4">Transactions</Text>
          <Container gap={16} direction="column">
            {txs ? (
              txs.map((tx) => <TxItem tx={tx} />)
            ) : (
              <Container className={styles.noTransactionsToDisplay}>
                <Text className={styles.noTransactionsLabel} variant="label">
                  No transactions have been completed with the treasury.
                </Text>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </DaoErrorBoundary>
  );
};
