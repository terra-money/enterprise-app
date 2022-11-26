import { UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import { Text } from 'components/primitives';
import { ReactNode } from 'react';
import styles from './FormSection.module.sass';

interface FormSectionProps extends UIElementProps {
  name: ReactNode;
}

export const FormSection = ({ className, name, children }: FormSectionProps) => {
  return (
    <div className={classNames(className, styles.root)}>
      <Text variant="heading4">{name}</Text>
      {children}
    </div>
  );
};
