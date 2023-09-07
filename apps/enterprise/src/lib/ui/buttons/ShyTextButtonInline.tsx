import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  text: ReactNode;
}

const Container = styled('span')`
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-weight: bold;
  font-size: 14px;
  border-bottom: 1px dashed;
  :hover {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`;

export const ShyTextButtonInline = ({ text }: Props) => {
  return <Container>{text}</Container>;
};