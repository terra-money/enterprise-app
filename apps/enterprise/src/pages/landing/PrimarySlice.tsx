import { Button, Text } from 'components/primitives';
import { useNavigate } from 'react-router';
import styles from './PrimarySlice.module.sass';

export const PrimarySlice = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <Text variant="heading1">Your no-code solution to DAO management</Text>
      <Text className={styles.description} variant="heading4" component="span">
        You don’t need to be a full-stack engineer to start a DAO. With Enterprise, you can create a multisig wallet,
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
