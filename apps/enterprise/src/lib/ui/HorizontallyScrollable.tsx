import styled from 'styled-components';
import { hideScrollbarsCSS } from './utils/hideScrollbarsCSS';

export const HorizontallyScrollable = styled.div`
  overflow-x: auto;
  width: 100%;
  ${hideScrollbarsCSS};
`;
