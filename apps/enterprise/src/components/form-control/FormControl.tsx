import classNames from 'classnames';
import { Container, UIElementProps } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import styles from './FormControl.module.sass';
import { ReactNode } from 'react';

interface FormControlProps extends UIElementProps {
  label: string;
  labelGap?: boolean;
  helpText?: string | ReactNode;
}

const FormControl = (props: FormControlProps) => {
  const { className, children, label, labelGap = true, helpText } = props;
  return (
    <Container className={classNames(className, styles.root)} component="section" direction="column">
      <Text
        className={classNames(styles.label, {
          [styles.labelGap]: labelGap,
        })}
        tooltip={helpText}
        variant="label"
      >
        {label}
      </Text>
      {children}
    </Container>
  );
};

export { FormControl };
