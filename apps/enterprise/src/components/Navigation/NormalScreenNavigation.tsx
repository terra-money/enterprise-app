import { ComponentWithChildrenProps } from 'lib/shared/props';
import { HStack, VStack } from 'lib/ui/Stack';
import { SideNavigation } from './SideNavigation';
import styled from 'styled-components';

const ScreenWidthSidebarContent = styled(VStack)`
  max-height: 100%;
  overflow: auto;
  height: 100%;
  width: 100%;
  padding: 48px;
`;

export const NormalScreenNavigation = ({ children }: ComponentWithChildrenProps) => {
  return (
    <HStack fullWidth fullHeight>
      <SideNavigation />
      <ScreenWidthSidebarContent>{children}</ScreenWidthSidebarContent>
    </HStack>
  );
};
