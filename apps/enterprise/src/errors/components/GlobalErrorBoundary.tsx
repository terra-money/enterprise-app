import { ComponentWithChildrenProps } from 'lib/shared/props';
import { Center } from 'lib/ui/Center';
import { Panel } from 'lib/ui/Panel/Panel';
import { GenericErrorFallback } from './GenericErrorFallback';
import { ErrorBoundary } from './ErrorBoundary';

export const GlobalErrorBoundary = ({ children }: ComponentWithChildrenProps) => {
  return (
    <ErrorBoundary
      fallback={(props) => (
        <Center>
          <Panel style={{ maxWidth: 520 }}>
            <GenericErrorFallback {...props} />
          </Panel>
        </Center>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
