import { ComponentWithChildrenProps } from 'lib/shared/props';
import { ResponsiveView } from 'lib/ui/ResponsiveView';
import { NormalScreenNavigation } from './NormalScreenNavigation';
import { SmallScreenNavigation } from './SmallScreenNavigation';

export const Navigation = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ResponsiveView
      small={() => <SmallScreenNavigation>{children}</SmallScreenNavigation>}
      normal={() => <NormalScreenNavigation>{children}</NormalScreenNavigation>}
    />
  );
};
