import { useIsScreenWidthLessThan } from 'lib/ui/hooks/useIsScreenWidthLessThan';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { VStack } from 'lib/ui/Stack';
import { ReactNode } from 'react';
import styled from 'styled-components';

export interface WizardBodyProps {
  children: ReactNode;
  helpContent?: ReactNode;
}

const HelpContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 96px 64px 0 64px;
`;

export const WizardBody = (props: WizardBodyProps) => {
  const { children, helpContent } = props;

  const isSmallScreen = useIsScreenWidthLessThan(1200);

  if (isSmallScreen) {
    return <VStack>{children}</VStack>;
  }

  return (
    <SameWidthChildrenRow gap={0} maxColumns={2}>
      {children}
      <HelpContainer>{helpContent}</HelpContainer>
    </SameWidthChildrenRow>
  );
};
