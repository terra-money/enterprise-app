import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { UIElementProps } from '@terra-money/apps/components';
import styles from './Text.module.sass';
import { TextTooltip } from './TextTooltip';

type ComponentName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'sub';

export type TextVariant = 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'label' | 'text' | 'link' | 'button';

const DefaultComponent: Record<TextVariant, ComponentName> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  label: 'span',
  text: 'span',
  link: 'span',
  button: 'span',
};

export interface TextProps extends UIElementProps {
  variant: TextVariant;
  component?: ComponentName;
  weight?: 'normal' | 'bold' | 'default';
  children: ReactNode;
  tooltip?: string | ReactNode;
  onClick?: () => void;
}

const Text = forwardRef<any, TextProps>((props, ref) => {
  const {
    className,
    variant,
    component = DefaultComponent[variant],
    weight = 'default',
    onClick,
    children,
    tooltip,
  } = props;

  const Component = component;

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={classNames(
        className,
        styles.root,
        styles[variant],
        {
          [styles[weight]]: weight !== 'default',
        },
        onClick && styles.clickable
      )}
      data-variant={variant}
    >
      {children}
      {tooltip && (
        <TextTooltip content={tooltip} />
      )}
    </Component>
  );
});

export { Text };
