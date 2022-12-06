import { IconButton } from 'components/primitives';
import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation/Path';
import { ReactComponent as HomeIcon } from 'components/assets/Home.svg';

export const DashboardButton = () => {
  return (
    <InternalLink to={Path.Dashboard}>
      <IconButton>
        <HomeIcon />
      </IconButton>
    </InternalLink>
  );
};
