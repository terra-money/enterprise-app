import { ComponentProps, Ref, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { defaultTransitionCSS } from '../animations/transitions';
import { centerContentCSS } from '../utils/centerContentCSS';
import { getCSSUnit } from '../utils/getCSSUnit';
import { getSameDimensionsCSS } from '../utils/getSameDimensionsCSS';
import { matchColor } from '../theme/getters';
import { match } from 'lib/shared/utils/match';
import { interactiveCSS } from '../utils/interactiveCSS';
import { roundedCSS } from '../utils/roundedCSS';

export const iconButtonSizes = ['s', 'm', 'l'] as const;
export type IconButtonSize = (typeof iconButtonSizes)[number];

export const iconButtonKinds = ['regular', 'secondary', 'alert'] as const;
export type IconButtonKind = (typeof iconButtonKinds)[number];

const sizeRecord: Record<IconButtonSize, number> = {
  s: 28,
  m: 36,
  l: 48,
};

interface ContainerProps {
  size: IconButtonSize;
  kind: IconButtonKind;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Container = styled.button<ContainerProps>`
  all: unset;
  ${interactiveCSS};
  position: relative;
  ${centerContentCSS};
  ${({ size }) => getSameDimensionsCSS(sizeRecord[size])};

  color: ${matchColor('kind', {
    regular: 'text',
    secondary: 'text',
    alert: 'alert',
  })};

  font-size: ${({ size }) => `calc(${getCSSUnit(sizeRecord[size] * 0.42)})`};

  ${roundedCSS};

  ${defaultTransitionCSS};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.8;
    `};

  background: ${({ kind, theme: { colors } }) =>
    match(kind, {
      regular: () => colors.mist,
      secondary: () => colors.transparent,
      alert: () => colors.alert.getVariant({ a: (a) => a * 0.12 }),
    }).toCssValue()};

  ${({ isDisabled, isLoading, kind, theme: { colors } }) =>
    !isDisabled &&
    !isLoading &&
    css`
      :hover {
        background: ${match(kind, {
          regular: () => colors.mist,
          secondary: () => colors.mist,
          alert: () => colors.alert.getVariant({ a: (a) => a * 0.24 }),
        }).toCssValue()};

        color: ${match(kind, {
          regular: () => colors.contrast,
          secondary: () => colors.contrast,
          alert: () => colors.alert,
        }).toCssValue()};
      }
    `};
`;

export interface IconButtonProps extends ComponentProps<typeof Container> {
  icon: React.ReactNode;
  size?: IconButtonSize;
  kind?: IconButtonKind;
  title: string;
}

export const IconButton = forwardRef(function IconButton(
  { size = 'm', kind = 'regular', icon, isDisabled = false, isLoading = false, ...rest }: IconButtonProps,
  ref: Ref<HTMLButtonElement> | null
) {
  return (
    <Container isDisabled={isDisabled} isLoading={isLoading} kind={kind} ref={ref} size={size} {...rest}>
      {icon}
    </Container>
  );
});
