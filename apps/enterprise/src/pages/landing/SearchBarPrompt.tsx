import { InternalLink } from 'components/link/InternalLink';
import { Text } from 'components/primitives';
import { Path } from 'navigation';
import styles from './SearchBarPrompt.module.sass';
import { ReactComponent as SearchIcon } from 'components/assets/Search.svg';
import { Button } from 'lib/ui/buttons/Button';

export const SearchBarPrompt = () => {
  return (
    <InternalLink to={Path.Daos} className={styles.root}>
      <div className={styles.placeholder}>
        <SearchIcon />
        <Text variant="text">Search for DAO...</Text>
      </div>
      <Button>Create new</Button>
    </InternalLink>
  );
};
