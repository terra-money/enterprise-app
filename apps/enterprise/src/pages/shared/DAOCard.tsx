import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { DAO } from 'types';
import { Skeleton } from 'components/skeleton';
import { useNavigate } from 'react-router';
import { FavouriteToggle } from 'components/favourite-toggle';
import styles from './DAOCard.module.sass';
import { DAOLogo } from 'components/dao-logo';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { enterprise } from 'types/contracts';
import { SeparatedBy, dotSeparator } from 'lib/ui/SeparatedBy';
import { SimpleTooltip } from 'lib/ui/popover/SimpleTooltip';

interface DAOCardProps {
  className?: string;
  dao?: DAO;
  skeleton: boolean;
}

const daoTypeName: Record<enterprise.DaoType, string> = {
  multisig: 'Multisig',
  nft: 'NFT DAO',
  token: 'Token DAO',
};

export const DAOCard = (props: DAOCardProps) => {
  const { className, dao, skeleton } = props;

  const navigate = useNavigate();

  if (dao === undefined || skeleton) {
    return (
      <Container className={classNames(className, styles.root, styles.skeleton)}>
        <Skeleton className={styles.logo} />
        <Skeleton className={styles.name} />
        <Skeleton className={styles.favourite} />
      </Container>
    );
  }

  const { tvl } = dao;

  return (
    <Container className={classNames(className, styles.root)} onClick={() => navigate(`/dao/${dao.address}`)}>
      <div className={styles.logo}>
        <DAOLogo logo={dao.logo} />
      </div>
      <Text className={styles.name} weight="semibold" size={14}>
        {dao.name}
      </Text>
      <SeparatedBy separator={dotSeparator}>
        <Text size={14} weight="semibold" color="supporting">
          {daoTypeName[dao.type]}
        </Text>
        {tvl && tvl > 0 && (
          <SimpleTooltip text="Total value locked">
            <Text size={14} weight="semibold" color="supporting">
              $ {formatAmount(tvl)}
            </Text>
          </SimpleTooltip>
        )}
      </SeparatedBy>
      <FavouriteToggle className={styles.favourite} dao={dao} />
    </Container>
  );
};
