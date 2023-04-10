import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { DAOLogo } from 'components/dao-logo';
import { Text } from 'components/primitives';
import { useCurrentDao } from 'dao/components/CurrentDaoProvider';
import { forwardRef, Ref } from 'react';
import { useNavigate } from 'react-router';
import styles from './Header.module.sass';
import { getDaoLogo } from 'dao/utils/getDaoLogo';

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
        <div className={styles.logo}>
          <DAOLogo size="s" logo={getDaoLogo(dao)} />
        </div>
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
        <div className={styles.logo}>
          <DAOLogo size="s" logo={getDaoLogo(dao)} />
        </div>
        <Text className={styles.name} variant="heading2">
          {title}
        </Text>
      </Container>
    </Container>
  );
});
