import { ComponentWithChildrenProps } from 'lib/shared/props';
import { HStack } from 'lib/ui/Stack';
import { SideNavigation } from './SideNavigation';

export const NormalScreenNavigation = ({ children }: ComponentWithChildrenProps) => {
  return (
    <HStack fullWidth fullHeight>
      <SideNavigation />
      {children}
    </HStack>
  );
};
