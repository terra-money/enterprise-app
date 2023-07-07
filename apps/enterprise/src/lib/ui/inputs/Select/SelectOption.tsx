import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';

import { InvisibleHTMLRadio, InvisibleHTMLRadioProps } from '../InvisibleHTMLRadio';
import { getColor } from 'lib/ui/theme/getters';
import { roundedCSS } from 'lib/ui/utils/roundedCSS';

const Container = styled.label<{ isSelected: boolean }>`
  cursor: pointer;
  ${roundedCSS}
  padding: 0 16px;
  text-decoration: none;
  ${centerContentCSS};
  font-size: 14px;
  font-weight: 500;
  height: 48px;

  :hover {
    background: ${getColor('mist')};
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${getColor('mist')};
    `};
`;

interface Props extends InvisibleHTMLRadioProps {
  children: ReactNode;
  className?: string;
}

export const SelectOption = ({ isSelected, children, className, ...rest }: Props) => {
  return (
    <Container className={className} tabIndex={-1} isSelected={isSelected}>
      {children}
      <InvisibleHTMLRadio isSelected={isSelected} {...rest} />
    </Container>
  );
};
