import { FormState } from 'lib/shared/hooks/useForm';
import { DaoImportInput } from 'pages/create-dao/DaoWizardFormProvider';

export const validateDaoImport = ({ shouldImport, daoAddress }: DaoImportInput): FormState<DaoImportInput> => {
  const formState: FormState<DaoImportInput> = { shouldImport, daoAddress };

  return formState;
};
