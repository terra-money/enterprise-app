import { Text } from 'components/primitives';
import { ReactNode } from 'react';
import styles from './FormSection.module.sass';
import { ComponentWithChildrenProps } from 'lib/shared/props';

interface FormSectionProps extends ComponentWithChildrenProps {
  name: ReactNode;
}

export const FormSection = ({ name, children }: FormSectionProps) => {
  return (
    <div className={styles.root}>
      <Text variant="heading4">{name}</Text>
      {children}
    </div>
  );
};
