import { css, keyframes } from 'styled-components';

const animation = keyframes`
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
`;

export const gradientColorCSS = css`
  background-image: linear-gradient(
    101.29deg,
    ${({ theme }) => theme.colors.gradient[0].toCssValue()} 2.97%,
    ${({ theme }) => theme.colors.gradient[1].toCssValue()} 44.41%,
    ${({ theme }) => theme.colors.gradient[2].toCssValue()} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  background-size: 600%;
  animation: ${animation} 16s linear infinite;
`;
