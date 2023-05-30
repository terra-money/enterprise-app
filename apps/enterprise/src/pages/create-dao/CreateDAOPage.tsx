import { DaoWizard } from './DaoWizard';
import { DaoWizardFormProvider } from './DaoWizardFormProvider';

export const CreateDAOPage = () => {
  return (
    <DaoWizardFormProvider>
      <DaoWizard />
    </DaoWizardFormProvider>
  );
};
