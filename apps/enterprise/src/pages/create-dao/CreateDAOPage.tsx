import { Navigation } from 'components/Navigation';
import { DaoWizard } from './DaoWizard';
import { DaoWizardFormProvider } from './DaoWizardFormProvider';

export const CreateDAOPage = () => {
  return (
    <Navigation>
      <DaoWizardFormProvider>
        <DaoWizard />
      </DaoWizardFormProvider>
    </Navigation>
  );
};
