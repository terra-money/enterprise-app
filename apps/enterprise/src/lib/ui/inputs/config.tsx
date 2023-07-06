import { getCSSUnit } from '@terra-money/apps/utils';
import { css } from 'styled-components';

export const inputBorderRadiusCSS = css`
  border-radius: 8px;
`;

export const inputHeight = 86;

export const defaultInputShapeCSS = css`
  height: ${getCSSUnit(inputHeight)};
  ${inputBorderRadiusCSS};
`;

export const inputBackgroundCSS = css`
  background: ${({ theme }) => theme.colors.backgroundGlass.toCssValue()};
`;

export const inputPaddingCSS = css`
  padding: 24px;
`;
