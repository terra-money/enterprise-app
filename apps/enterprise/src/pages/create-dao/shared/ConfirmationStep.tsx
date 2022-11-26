import { WizardStep } from '../WizardStep';

interface ConfirmationStepProps {
  pending: boolean;
}

export function ConfirmationStep({ pending }: ConfirmationStepProps) {
  const helpContent = pending && <div></div>;

  return <WizardStep helpContent={helpContent} title="Congratulations!" subTitle="We're ready to create your DAO" />;
}
