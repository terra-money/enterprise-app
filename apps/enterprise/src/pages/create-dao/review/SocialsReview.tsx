import { DaoSocialDataInput, useDaoWizardForm } from '../DaoWizardFormProvider';
import { LabeledValue } from 'lib/ui/LabeledValue';
import { socialName } from '../shared/SocialFields';

export const SocialsReview = () => {
  const {
    formState: { socials },
  } = useDaoWizardForm();

  return (
    <>
      {Object.keys(socials).map((key) => {
        if (key in socialName) {
          const socialField = key as keyof DaoSocialDataInput;
          const value = socials[socialField];

          return <LabeledValue name={socialName[socialField]}>{value ?? '-'}</LabeledValue>;
        }
        return null;
      })}
    </>
  );
};
