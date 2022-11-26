import { UIElementProps } from '@terra-money/apps/components';
import { Text } from 'components/primitives';
import styles from './InputWrapper.module.sass';
import classNames from 'classnames';

interface InputWrapperProps extends UIElementProps {
  label: string;
}

export const InputWrapper = ({ className, children, label }: InputWrapperProps) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Text variant="label">{label}</Text>
      {children}
    </div>
  );
};
