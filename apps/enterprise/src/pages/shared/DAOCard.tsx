import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { DAO } from 'types';
import { Skeleton } from 'components/skeleton';
import { useNavigate } from 'react-router';
import { FavouriteToggle } from 'components/favourite-toggle';
import styles from './DAOCard.module.sass';
import { DAOLogo } from 'components/dao-logo';

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

  const logo = <DAOLogo logo={dao.logo} className={styles.logo} />;

  const description =
    dao.type === undefined
      ? undefined
      : dao.type === 'multisig'
      ? 'Multisig DAO'
      : dao.type === 'nft'
      ? 'NFT Community DAO'
      : 'Community Token DAO';

  return (
    <Container className={classNames(className, styles.root)} onClick={() => navigate(`/dao/${dao.address}`)}>
      {logo}
      <Text className={styles.name} variant="heading4">
        {dao.name}
      </Text>
      <Text className={styles.type} variant="label">
        {description}
      </Text>
      <FavouriteToggle className={styles.favourite} dao={dao} />
    </Container>
  );
};
