import { ErrorBoundary } from 'errors/components/ErrorBoundary';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';
import { DAOPageContent } from './DAOPageContent';

export const DaoPage = () => {
  return (
    <ErrorBoundary fallback={(props) => <GenericErrorFallback {...props} />}>
      <DAOPageContent />
    </ErrorBoundary>
  );
};
