import { InternalLink } from 'components/link/InternalLink';
import { Button, Text } from 'components/primitives';
import { Path } from 'navigation';
import styles from './SearchBarPrompt.module.sass';
import { ReactComponent as SearchIcon } from 'components/assets/Search.svg';

export const SearchBarPrompt = () => {
  return (
    <InternalLink to={Path.Daos} className={styles.root}>
      <div className={styles.placeholder}>
        <SearchIcon />
        <Text variant="text">Search for DAO...</Text>
      </div>
      <Button variant="primary">Create new</Button>
    </InternalLink>
  );
};
