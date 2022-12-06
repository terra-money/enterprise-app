import { InternalLink } from 'lib/navigation/Link/InternalLink';
import { Path } from 'navigation/Path';
import { useLocation } from 'react-router-dom';

import { NavigationItem } from './NavigationItem';

interface Props {
  path: Path;
  name: string;
}

export const NavigationToInternalPage = ({ path, name }: Props) => {
  const location = useLocation();

  return (
    <InternalLink to={path}>
      <NavigationItem name={name} isActive={location.pathname === path} />
    </InternalLink>
  );
};
