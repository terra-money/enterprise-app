import { ReactNode } from 'react';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';

interface FormFooterProps {
  primary: ReactNode;
  secondary: ReactNode;
}

export const FormFooter = ({ primary, secondary }: FormFooterProps) => {
  return (
    <SameWidthChildrenRow  gap={16} childrenWidth={140}>
      {secondary}
      {primary}
    </SameWidthChildrenRow>
  );
};
