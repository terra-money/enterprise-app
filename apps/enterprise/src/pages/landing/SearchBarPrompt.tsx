import { InternalLink } from 'components/link/InternalLink';
import { Text } from 'lib/ui/Text';
import { Path } from 'navigation';
import styles from './SearchBarPrompt.module.sass';
import { ReactComponent as SearchIcon } from 'components/assets/Search.svg';
import { Button } from 'lib/ui/buttons/Button';

export const SearchBarPrompt = () => {
  return (
    <InternalLink to={Path.Daos} className={styles.root}>
      <div className={styles.placeholder}>
        <SearchIcon />
        <Text size={14} color="supporting">
          Search for DAO...
        </Text>
      </div>
      <Button>Create new</Button>
    </InternalLink>
  );
};
