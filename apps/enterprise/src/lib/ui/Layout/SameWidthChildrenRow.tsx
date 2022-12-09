import styled, { css } from 'styled-components';
import { getCSSUnit } from 'lib/ui/utils/getCSSUnit';

interface Props {
  gap: number;
  minChildrenWidth?: number;
  rowHeight?: number;
  fullWidth?: boolean;
  maxColumns?: number;
}

export const SameWidthChildrenRow = styled.div<Props>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      max(
        ${({ minChildrenWidth }) => getCSSUnit(minChildrenWidth || 0)},
        ${({ maxColumns, gap }) => {
          if (!maxColumns) return `0px`;

          const gapCount = maxColumns - 1;
          const totalGapWidth = `calc(${gapCount} * ${getCSSUnit(gap)})`;

          return `calc((100% - ${totalGapWidth}) / ${maxColumns})`;
        }}
      ),
      1fr
    )
  );
  gap: ${({ gap }) => getCSSUnit(gap)};
  ${({ rowHeight }) =>
    rowHeight &&
    css`
      grid-auto-rows: ${getCSSUnit(rowHeight)};
    `}
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
