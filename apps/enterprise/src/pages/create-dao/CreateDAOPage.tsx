import { NavigationLayout } from 'components/layout';
import { DaoWizard } from './DaoWizard';
import { DaoWizardFormProvider } from './DaoWizardFormProvider';

export const CreateDAOPage = () => {
  return (
    <NavigationLayout>
      <DaoWizardFormProvider>
        <DaoWizard />
      </DaoWizardFormProvider>
    </NavigationLayout>
  );
};
