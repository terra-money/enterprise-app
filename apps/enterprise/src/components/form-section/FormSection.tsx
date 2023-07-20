import { Text } from 'lib/ui/Text';
import { ReactNode } from 'react';
import styles from './FormSection.module.sass';
import { ComponentWithChildrenProps } from 'lib/shared/props';

interface FormSectionProps extends ComponentWithChildrenProps {
  name: ReactNode;
}

export const FormSection = ({ name, children }: FormSectionProps) => {
  return (
    <div className={styles.root}>
      <Text weight="semibold">{name}</Text>
      {children}
    </div>
  );
};
