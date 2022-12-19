import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { centerContentCSS } from 'lib/ui/utils/centerContentCSS';

import { InvisibleHTMLRadio, Props as InvisibleHTMLRadioProps } from '../InvisibleHTMLRadio';
import { gradientBackgroundCSS } from 'lib/ui/gradients';

const Wrapper = styled.label<{ isSelected: boolean }>`
  background: ${({ theme }) => theme.colors.foregroundAlt.toCssValue()};
  padding: 2px;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  height: 84px;

  ${({ isSelected }) => isSelected && gradientBackgroundCSS};
`;

const Container = styled.div`
  border-radius: 10px;
  font-weight: 500;
  width: 100%;
  height: 100%;
  ${centerContentCSS};
  justify-content: flex-start;
  padding: 0 32px;

  background: ${({ theme }) => theme.colors.foregroundAlt.toCssValue()};
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
