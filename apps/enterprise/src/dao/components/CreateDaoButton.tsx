import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation';
import { PlusIcon } from 'lib/ui/icons/PlusIcon';
import { IconButton } from 'lib/ui/buttons/IconButton';

export const CreateDaoButton = () => {
  return (
    <InternalLink to={Path.CreateDao}>
      <IconButton title="Create DAO" as="div" size="l" icon={<PlusIcon />} />
    </InternalLink>
  );
};
