import { Container } from '@terra-money/apps/components';
import { IconButton, Text } from '../../components/primitives';
import { ReactNode } from 'react';
import { Action } from 'types';
import styles from './SocialItem.module.sass';

interface SocialItemProps {
  icon: ReactNode;
  username: string;
  onClick: Action<void>;
}

export const SocialItem = (props: SocialItemProps) => {
  const { icon, username, onClick } = props;
  return (
    <Container direction={'row'} gap={16}>
      <IconButton className={styles.icon} onClick={() => onClick()}>
        {icon}
      </IconButton>
      <Text variant={'text'}>{username}</Text>
    </Container>
  );
};
