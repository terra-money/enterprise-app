import styled from 'styled-components';
import { defaultTransitionCSS } from '../animations/transitions';
import { getColor } from '../theme/getters';
import { interactiveCSS } from '../utils/interactiveCSS';
import { Text } from '.';

export const ShyLinkText = styled(Text)`
  color: ${getColor('textSupporting')};
  ${interactiveCSS};
  ${defaultTransitionCSS}
  font-size: 14px;

  :hover {
    color: ${getColor('text')};
  }
`;
