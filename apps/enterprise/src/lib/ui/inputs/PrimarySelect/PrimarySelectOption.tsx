import { ReactNode, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';

import { InvisibleHTMLRadio, InvisibleHTMLRadioProps } from '../InvisibleHTMLRadio';
import { getColor } from 'lib/ui/theme/getters';

const Wrapper = styled.label<{ isSelected: boolean }>`
  background: ${getColor('foreground')};
  padding: 2px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  height: 84px;

  border: 2px solid transparent;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: ${getColor('contrast')};
    `}
`;

const Container = styled.div`
  border-radius: 10px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  ${centerContentCSS};
  justify-content: flex-start;
  padding: 0 32px;

  background: ${getColor('foreground')};
`;

interface Props extends InvisibleHTMLRadioProps {
  children: ReactNode;
}

export const PrimarySelectOption = ({ isSelected, children, ...rest }: Props) => {
  const ref = useRef<HTMLLabelElement>(null);
  useEffect(() => {
    if (isSelected) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  return (
    <Wrapper tabIndex={-1} ref={ref} isSelected={isSelected}>
      <Container>{children}</Container>
      <InvisibleHTMLRadio isSelected={isSelected} {...rest} />
    </Wrapper>
  );
};
