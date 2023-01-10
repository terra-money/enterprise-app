import styled from 'styled-components';
import { defaultBorderRadiusCSS } from 'lib/ui/borderRadius';

export const ReversedTooltip = styled.div`
  ${defaultBorderRadiusCSS};
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.text.getVariant({ a: () => 1 }).toCssValue()};
  color: ${({ theme }) => theme.colors.background.toCssValue()};
`;
