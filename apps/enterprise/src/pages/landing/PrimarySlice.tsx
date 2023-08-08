import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { useDisplay } from 'hooks';
import { useNavigate } from 'react-router';
import styles from './PrimarySlice.module.sass';
import { Button } from 'lib/ui/buttons/Button';

export const PrimarySlice = () => {
  const navigate = useNavigate();

  const { isMobile } = useDisplay();

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <Text size={40} weight="bold">
        Your no-code solution to DAO management
      </Text>
      <Text style={{ maxWidth: 840 }} centered weight="semibold" as="span">
        You don't need to be a full-stack engineer to start a DAO. With Enterprise, you can create a multisig wallet,
        token DAO, or NFT DAO in under a minute.
      </Text>
      <Button
        onClick={() => {
          navigate('dashboard');
        }}
      >
        Launch App
      </Button>
    </div>
  );
};
