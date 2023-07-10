import { ReactNode } from 'react';
import styles from './FormFooter.module.sass';
import { HStack } from 'lib/ui/Stack';

interface FormFooterProps {
  primary: ReactNode;
  secondary: ReactNode;
}

export const FormFooter = ({ primary, secondary }: FormFooterProps) => {
  return (
    <HStack className={styles.root} gap={16} alignItems="center">
      {secondary}
      {primary}
    </HStack>
  );
};
