import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { AnimateNumber } from '@terra-money/apps/components';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { Panel } from 'components/panel';
import { Text } from 'components/primitives';
import { useDAONFTTreasury } from 'queries';
import { DAO } from 'types';
import styles from './TreasuryOverview.module.sass';
import { TreasuryTokensOverview } from './TreasuryTokensOverview';

interface TreasuryOverviewProps {
  dao: DAO;
  className?: string;
}

export const TreasuryOverview = (props: TreasuryOverviewProps) => {
  const { dao, className } = props;

  const { data: nfts = [] } = useDAONFTTreasury(dao.address);

  const nftTokenIdCount = nfts.reduce((previous, current) => {
    return previous + current.token_ids.length;
  }, 0);

  return (
    <Panel className={classNames(className, styles.root)}>
      <Container direction="column" gap={32}>
        <TreasuryTokensOverview />
        <hr className={styles.sep} />
        <Container className={styles.nftAssets}>
          <Container gap={30}>
            <img src="/images/NFT_Placeholder.png" width={156} className={styles.nftPreview} alt="NFT Preview" />
            <Container direction="column" gap={8}>
              <Text variant="label">No of NFT Treasury Items</Text>
              <Text className={styles.content} variant="heading3">
                <AnimateNumber
                  format={(v) =>
                    formatAmount(v, {
                      decimals: 0,
                    })
                  }
                >
                  {nftTokenIdCount}
                </AnimateNumber>
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    </Panel>
  );
};
