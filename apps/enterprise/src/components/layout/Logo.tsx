import { Container } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { ReactComponent as LogoIcon } from 'components/assets/LogoSmall.svg';
import styles from './Logo.module.sass';

interface LogoProps {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

export const Logo = (props: LogoProps) => {
  const { className, compact = false, onClick } = props;

  return (
    <Container className={classNames(className, styles.root)}>
      <div
        className={classNames(styles.icon, {
          [styles.clickable]: onClick,
        })}
        onClick={() => onClick && onClick()}
      >
        <LogoIcon />
      </div>

      {compact === false && (
        <Text className={styles.text} variant="heading3" weight="bold">
          Enterprise
        </Text>
      )}
    </Container>
  );
};
