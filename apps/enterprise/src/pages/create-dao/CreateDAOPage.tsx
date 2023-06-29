import { ErrorBoundary } from '@sentry/react';
import { DaoWizard } from './DaoWizard';
import { DaoWizardFormProvider } from './DaoWizardFormProvider';
import { GenericErrorFallback } from 'errors/components/GenericErrorFallback';

export const CreateDAOPage = () => {
  return (
    <ErrorBoundary fallback={(props) => <GenericErrorFallback {...props} />}>
      <DaoWizardFormProvider>
        <DaoWizard />
      </DaoWizardFormProvider>
    </ErrorBoundary>
  );
};
