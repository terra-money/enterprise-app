import classNames from 'classnames';
import { Text } from 'lib/ui/Text';
import { useDisplay } from 'hooks';
import { useNavigate } from 'react-router';
import styles from './PrimarySlice.module.sass';
import { Button } from 'lib/ui/buttons/Button';
import { HStack } from 'lib/ui/Stack';
import { ExternalLink } from 'components/link';

export const PrimarySlice = () => {
  const navigate = useNavigate();

  const { isMobile } = useDisplay();

  return (
    <div className={classNames(styles.root, { [styles.mobile]: isMobile })}>
      <Text size={40} weight="bold">
        Your no-code solution to DAO management
      </Text>
      <Text style={{ maxWidth: 840 }} centered weight="semibold" as="span">
        Create a token, NFT, or multisig DAO in under one minute.
      </Text>
      <HStack alignItems="center" gap={20}>
        <Button
          onClick={() => {
            navigate('dashboard');
          }}
        >
          Launch App
        </Button>
        <ExternalLink to="https://twitter.com/enterprise_dao">
          <Button as="div">Follow Enterprise</Button>
        </ExternalLink>
      </HStack>
    </div>
  );
};
