import { VStack } from 'lib/ui/Stack';
import { DaoWizardStep, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';
import { daoTypeName } from 'dao'
import { ReviewSection } from '../review/ReviewSection';

interface ConfirmationStepProps {
  isLoading: boolean;
}

const immutableSteps: DaoWizardStep[] = ['type', 'daoImport', 'confirm'];

const reviewSectionTitle: Partial<Record<DaoWizardStep, string>> = {
  info: 'Info',
  council: 'Council',
  socials: 'Socials',
  govConfig: 'Governance',
  members: 'Members',
  membership: 'Membership',
  tokenInfo: 'Token',
  whitelist: 'Whitelist',
  initialBalances: 'Initial balances',
}

export function ConfirmationStep({ isLoading }: ConfirmationStepProps) {
  const { formState: { type, steps }, goToStep } = useDaoWizardForm();

  return <WizardStep title={`Create ${daoTypeName[type]} DAO`} subTitle="Review configuration">
    <VStack gap={16}>
      {
        steps.map(step => {
          if (immutableSteps.includes(step)) return null;

          return (
            <ReviewSection
              name={reviewSectionTitle[step] ?? step}
              onEdit={isLoading ? undefined : () => goToStep(step)}>
              coming soon!
            </ReviewSection>
          )
        })
      }
    </VStack>
  </WizardStep>
}
