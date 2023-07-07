import styled, { DefaultTheme, css } from 'styled-components';
import { croppedTextCSS } from '../utils/croppedTextCSS';

const getTextColorRecord = ({ colors }: DefaultTheme) =>
  ({
    regular: colors.text,
    supporting: colors.textSupporting,
    shy: colors.textShy,

    primary: colors.primary,
    attention: colors.attention,
    alert: colors.alert,
    idle: colors.idle,
    success: colors.success,
    reversed: colors.background,
    white: colors.contrast,
  } as const);

type TextWeight = 'regular' | 'semibold' | 'bold';
const fontWeight: Record<TextWeight, number> = {
  regular: 400,
  semibold: 500,
  bold: 600,
};

type TextHeight = 'small' | 'regular' | 'large';
const lineHeight: Record<TextHeight, number> = {
  small: 1,
  regular: 1.2,
  large: 1.5,
};

export type TextColor = keyof ReturnType<typeof getTextColorRecord>;

export interface Props {
  color?: TextColor;
  weight?: TextWeight;
  size?: number;
  height?: TextHeight;
  centered?: boolean;
  cropped?: boolean;
}

const getFonSize = (sizeInPx: number) => {
  const oneRemInPx = 16;
  const sizeInRem = sizeInPx / oneRemInPx;

  return `${sizeInRem}rem`;
};

export const Text = styled.p<Props>`
  margin: 0;
  padding: 0;

  ${({ color = 'regular', theme }) => css`
    color: ${getTextColorRecord(theme)[color].toCssValue()};
  `}
  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${fontWeight[weight]};
    `}
  ${({ height }) =>
    height &&
    css`
      line-height: ${lineHeight[height]};
    `}
  ${({ size }) =>
    size &&
    css`
      font-size: ${getFonSize(size)};
    `}
  ${({ centered }) =>
    centered &&
    css`
      text-align: center;
    `}

  ${({ cropped }) => cropped && croppedTextCSS}
`;
