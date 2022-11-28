import classNames from 'classnames';
import { Button, Text } from 'components/primitives';
import { useDisplay } from 'hooks';
import { useNavigate } from 'react-router';
import styles from './PrimarySlice.module.sass';

export const PrimarySlice = () => {
  const navigate = useNavigate();

  const { isMobile } = useDisplay();

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <Text variant="heading1">Your no-code solution to DAO management</Text>
      <Text className={styles.description} variant="heading4" component="span">
        You don't need to be a full-stack engineer to start a DAO. With Enterprise, you can create a multisig wallet,
        token DAO, or NFT DAO in under a minute.
      </Text>
      <Button
        variant="primary"
        onClick={() => {
          navigate('dashboard');
        }}
      >
        Launch App
      </Button>
    </div>
  );
};
