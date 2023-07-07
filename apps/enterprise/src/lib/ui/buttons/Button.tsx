import styled, { css } from 'styled-components';
import { defaultTransitionCSS } from 'lib/ui/animations/transitions';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';
import { getHorizontalPaddingCSS } from 'lib/ui/utils/getHorizontalPaddingCSS';
import { Spinner } from 'lib/ui/Spinner';

import { Tooltip } from 'lib/ui/Tooltip';
import { UnstyledButton } from './UnstyledButton';
import { match } from 'lib/shared/utils/match';
import { getColor } from '../theme/getters';
import { CenterAbsolutely } from '../CenterAbsolutely';
import { roundedCSS } from '../utils/roundedCSS';

export const buttonSizes = ['xs', 's', 'm', 'l', 'xl'] as const;

type ButtonSize = (typeof buttonSizes)[number];

export const buttonKinds = [
  'primary',
  'secondary',
  'alert',
  'outlined',
  'outlinedAlert',
  'ghost',
  'ghostSecondary',
] as const;

export type ButtonKind = (typeof buttonKinds)[number];

interface ContainerProps {
  size: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  kind: ButtonKind;
}

const Container = styled(UnstyledButton)<ContainerProps>`
  ${defaultTransitionCSS};
  ${centerContentCSS};

  position: relative;

  white-space: nowrap;
  font-weight: 500;

  ${roundedCSS};

  ${({ size }) =>
    ({
      xs: css`
        ${getHorizontalPaddingCSS(8)}
        height: 28px;
        font-size: 14px;
      `,
      s: css`
        ${getHorizontalPaddingCSS(16)}
        height: 36px;
        font-size: 14px;
      `,
      m: css`
        ${getHorizontalPaddingCSS(24)}
        height: 64px;
        font-size: 16px;
      `,
      l: css`
        ${getHorizontalPaddingCSS(20)}
        height: 56px;
        font-size: 14px;
      `,
      xl: css`
        ${getHorizontalPaddingCSS(40)}
        height: 56px;
        font-size: 18px;
      `,
    }[size])};

  ${({ kind }) =>
    match(kind, {
      primary: () => css`
        background: ${getColor('contrast')};
        color: ${getColor('background')};
      `,
      secondary: () => css`
        background: ${getColor('mist')};
        color: ${getColor('contrast')};
      `,
      alert: () => css`
        background: ${getColor('alert')};
        color: ${getColor('white')};
      `,
      outlined: () => css`
        border: 1px solid ${getColor('mistExtra')};
        color: ${getColor('contrast')};
      `,
      outlinedAlert: () => css`
        border: 1px solid ${getColor('alert')};
        color: ${getColor('alert')};
      `,
      ghost: () => css`
        color: ${getColor('contrast')};
      `,
      ghostSecondary: () => css`
        color: ${getColor('textSupporting')};
      `,
    })}

  ${({ isDisabled, isLoading, kind }) =>
    !isDisabled &&
    !isLoading &&
    css`
      :hover {
        ${match(kind, {
          primary: () => css`
            background: ${getColor('text')};
          `,
          secondary: () => css`
            background: ${getColor('mistExtra')};
          `,
          alert: () => css`
            background: ${({ theme }) => theme.colors.alert.getVariant({ l: (l) => l * 0.92 }).toCssValue()};
          `,
          outlined: () => css`
            background: ${getColor('mist')};
            color: ${getColor('contrast')};
          `,
          outlinedAlert: () => css`
            background: ${({ theme }) => theme.colors.alert.getVariant({ a: (a) => a * 0.12 }).toCssValue()};
          `,
          ghost: () => css`
            background: ${getColor('mist')};
          `,
          ghostSecondary: () => css`
            background: ${getColor('mist')};
          `,
        })}
      }
    `};

  cursor: ${({ isDisabled, isLoading }) => (isDisabled ? 'initial' : isLoading ? 'wait' : 'pointer')};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.8;
    `};
`;

export interface ButtonProps extends React.ComponentProps<typeof Container> {
  size?: ButtonSize;
  isDisabled?: boolean | string;
  isLoading?: boolean;
  isRounded?: boolean;
  kind?: ButtonKind;
  onClick?: () => void;
}

const Hide = styled.div`
  opacity: 0;
`;

export const Button = ({
  children,
  size = 'm',
  isDisabled = false,
  isLoading = false,
  onClick,
  kind = 'primary',
  ...rest
}: ButtonProps) => {
  const content = isLoading ? (
    <>
      <Hide>{children}</Hide>
      <CenterAbsolutely>
        <Spinner />
      </CenterAbsolutely>
    </>
  ) : (
    children
  );

  const containerProps = {
    kind,
    size,
    isDisabled: !!isDisabled,
    isLoading,
    onClick: isDisabled || isLoading ? undefined : onClick,
    ...rest,
  };

  if (typeof isDisabled === 'string') {
    return (
      <Tooltip
        content={isDisabled}
        renderOpener={(props) => (
          <Container {...props} {...containerProps}>
            {content}
          </Container>
        )}
      />
    );
  }

  return <Container {...containerProps}>{content}</Container>;
};
