import { Container, UIElementProps } from '@terra-money/apps/components';
import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './FormFooter.module.sass';

interface FormFooterProps extends UIElementProps {
  primary: ReactNode;
  secondary: ReactNode;
}

export const FormFooter = ({ primary, secondary, className }: FormFooterProps) => {
  return (
    <Container className={classNames(className, styles.root)} gap={16} direction="row">
      {secondary}
      {primary}
    </Container>
  );
};
