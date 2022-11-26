import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { DAOLogo } from 'components/dao-logo';
import { Text } from 'components/primitives';
import { useCurrentDao } from 'pages/shared/CurrentDaoProvider';
import { forwardRef, Ref } from 'react';
import { useNavigate } from 'react-router';
import styles from './Header.module.sass';

interface HeaderProps {
  className?: string;
  compact?: boolean;
  title: string;
}

export const Header = forwardRef((props: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const dao = useCurrentDao();
  const { className, compact = false, title } = props;

  const navigate = useNavigate();

  if (compact) {
    return (
      <Container ref={ref} className={classNames(className, styles.root, styles.compact)}>
        <DAOLogo className={styles.logo} logo={dao.logo} />
        <Text className={styles.name} variant="heading2">
          {title}
        </Text>
      </Container>
    );
  }

  return (
    <Container className={classNames(className, styles.root)} direction="column">
      <Container ref={ref} className={styles.container}>
        <Text className={styles.back} variant="link" onClick={() => navigate(-1)}>
          Back
        </Text>
        <DAOLogo className={styles.logo} logo={dao.logo} />
        <Text className={styles.name} variant="heading2">
          {title}
        </Text>
      </Container>
    </Container>
  );
});
