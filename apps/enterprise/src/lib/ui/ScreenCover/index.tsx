import styled, { css } from 'styled-components';
import { zIndex } from 'lib/ui/zIndex';

export const ScreenCover = styled.div<{ isBlurred?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${zIndex.screenCover};

  background: ${({ theme }) => theme.colors.overlay.toCssValue()};

  ${({ isBlurred }) =>
    isBlurred &&
    css`
      backdrop-filter: blur(4px);
    `}
`;
