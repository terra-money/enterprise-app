import { ErrorBoundary } from '@sentry/react';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';
import { CreateProposalPageContent } from './CreateProposalPageContent';

export const CreateProposalPage = () => (
  <ErrorBoundary fallback={(props) => <GenericErrorFallback {...props} />}>
    <CreateProposalPageContent />
  </ErrorBoundary>
);
