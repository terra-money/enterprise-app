import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'lib/ui/Text'
import { DAO } from 'types';
import { Skeleton } from 'components/skeleton';
import { useNavigate } from 'react-router';
import { FavouriteToggle } from 'components/favourite-toggle';
import styles from './DAOCard.module.sass';
import { DAOLogo } from 'components/dao-logo';
import { formatAmount } from '@terra-money/apps/libs/formatting';
import { HStack } from 'lib/ui/Stack';

interface DAOCardProps {
  className?: string;
  dao?: DAO;
  skeleton: boolean;
}

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

  const description =
    dao.type === undefined
      ? undefined
      : dao.type === 'multisig'
        ? 'Multisig DAO'
        : dao.type === 'nft'
          ? 'NFT Community DAO'
          : 'Community Token DAO';

  const { tvl } = dao

  return (
    <Container className={classNames(className, styles.root)} onClick={() => navigate(`/dao/${dao.address}`)}>
      <div className={styles.logo}>
        <DAOLogo logo={dao.logo} />
      </div>
      <Text className={styles.name} weight="semibold" size={14}>
        {dao.name}
      </Text>
      <HStack className={styles.type} alignItems='center' gap={4} wrap="wrap">
        <Text color="supporting" size={14}>
          {description}
        </Text>
        {tvl && <Text size={14} weight="semibold" color="success">TVL: {formatAmount(tvl)}$</Text>}
      </HStack>
      <FavouriteToggle className={styles.favourite} dao={dao} />
    </Container>
  );
};
