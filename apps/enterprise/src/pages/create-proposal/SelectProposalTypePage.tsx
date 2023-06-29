import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';
import { SelectProposalTypePageContent } from './SelectProposalTypePageContent';

export const SelectProposalTypePage = () => (
  <ErrorBoundary fallback={(props) => <GenericErrorFallback {...props} />}>
    <SelectProposalTypePageContent />
  </ErrorBoundary>
);
