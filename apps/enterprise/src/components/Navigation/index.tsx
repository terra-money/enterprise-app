import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { NormalScreenNavigation } from './NormalScreenNavigation';
import { SmallScreenNavigation } from './SmallScreenNavigation';
import { Outlet } from 'react-router';

export const Navigation = () => {
  return (
    <ResponsiveView
      small={() => (
        <SmallScreenNavigation>
          <Outlet />
        </SmallScreenNavigation>
      )}
      normal={() => (
        <NormalScreenNavigation>
          <Outlet />
        </NormalScreenNavigation>
      )}
    />
  );
};
