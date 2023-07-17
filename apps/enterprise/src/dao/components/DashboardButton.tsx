import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation/Path';
import { ReactComponent as HomeIcon } from 'components/assets/Home.svg';
import { IconButton } from 'lib/ui/buttons/IconButton';

export const DashboardButton = () => {
  return (
    <InternalLink to={Path.Dashboard}>
      <IconButton as="div" icon={<HomeIcon />} size="l" title="Dashboard" />
    </InternalLink>
  );
};
