import { getCSSUnit } from 'lib/ui/utils/getCSSUnit';
import { css } from 'styled-components';

export const inputBorderRadiusCSS = css`
  border-radius: 8px;
`;

export const inputHeight = 86;

export const inputHeightCSS = css`
  height: ${getCSSUnit(inputHeight)};
`;

export const defaultInputShapeCSS = css`
  ${inputHeightCSS};
  ${inputBorderRadiusCSS};
`;

export const inputBackgroundCSS = css`
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
`;

export const inputPaddingCSS = css`
  padding: 24px;
`;
