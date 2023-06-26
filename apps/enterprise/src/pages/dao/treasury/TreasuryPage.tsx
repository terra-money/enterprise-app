import { DaoErrorBoundary } from '../DaoErrorBoundary';
import { CurrentDaoTreasuryAssets } from 'dao/components/TreasuryAssets/CurrentDaoTreasuryAssets';
import { CurrentDaoTreasuryNfts } from 'dao/components/TreasuryNfts/CurrentDaoTreasuryNfts';
import { VStack } from 'lib/ui/Stack';
import { CurrentDaoTransactionsHistory } from 'dao/components/TransactionsHistory/CurrentDaoTransactionsHistory';

export const TreasuryPage = () => {
  return (
    <DaoErrorBoundary>
      <VStack gap={24}>
        <CurrentDaoTreasuryAssets />
        <CurrentDaoTreasuryNfts />
        <CurrentDaoTransactionsHistory />
      </VStack>
    </DaoErrorBoundary>
  );
};
