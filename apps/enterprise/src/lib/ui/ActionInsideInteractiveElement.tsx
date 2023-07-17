import { ReactNode } from 'react';
import styled from 'styled-components';

import { ElementSizeAware } from './ElementSizeAware';
import { ElementSize } from './hooks/useElementSize';

interface ActionInsideInteractiveElementRenderParams<T extends React.CSSProperties> {
  actionSize: ElementSize;
  actionPlacerStyles: T;
}

interface ActionInsideInteractiveElementProps<T extends React.CSSProperties> {
  render: (params: ActionInsideInteractiveElementRenderParams<T>) => ReactNode;
  action: ReactNode;
  actionPlacerStyles: T;
}

const ActionPlacer = styled.div`
  position: absolute;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export function ActionInsideInteractiveElement<T extends React.CSSProperties>({
  render,
  action,
  actionPlacerStyles,
}: ActionInsideInteractiveElementProps<T>) {
  return (
    <Container>
      <ElementSizeAware
        render={({ setElement, size }) => (
          <>
            {size &&
              render({
                actionPlacerStyles,
                actionSize: size,
              })}
            <ActionPlacer ref={setElement} style={actionPlacerStyles}>
              {action}
            </ActionPlacer>
          </>
        )}
      />
    </Container>
  );
}
