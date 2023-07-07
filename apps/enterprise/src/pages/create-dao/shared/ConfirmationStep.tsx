import { VStack } from 'lib/ui/Stack';
import { DaoWizardStep, useDaoWizardForm } from '../DaoWizardFormProvider';
import { WizardStep } from '../WizardStep';
import { daoTypeName } from 'dao';
import { ReviewSection } from '../review/ReviewSection';
import { InfoReview } from '../review/InfoReview';
import { CouncilReview } from '../review/CouncilReview';
import { SocialsReview } from '../review/SocialsReview';
import { GovConfigReview } from '../review/GovConfigReview';
import { MembersReview } from '../review/MembersReview';
import { MembershipReview } from '../review/MembershipReview';
import { TokenInfoReview } from '../review/TokenInfoReview';
import { WhitelistReview } from '../review/WhitelistReview';
import { InitialBalancesReview } from '../review/InitialBalancesReview';
import { Line } from 'lib/ui/Line';
import { Fragment } from 'react';
import { Match } from 'lib/ui/Match';

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
};

export function ConfirmationStep({ isLoading }: ConfirmationStepProps) {
  const {
    formState: { type, steps },
    goToStep,
  } = useDaoWizardForm();

  return (
    <WizardStep title={`Create ${daoTypeName[type]} DAO`} subTitle="Review configuration">
      <VStack gap={20}>
        {steps.map((step) => {
          if (immutableSteps.includes(step)) return null;

          return (
            <Fragment key={step}>
              <ReviewSection
                name={reviewSectionTitle[step] ?? step}
                onEdit={isLoading ? undefined : () => goToStep(step)}
              >
                <Match
                  value={step}
                  type={() => null}
                  daoImport={() => null}
                  confirm={() => null}
                  info={() => <InfoReview />}
                  council={() => <CouncilReview />}
                  socials={() => <SocialsReview />}
                  govConfig={() => <GovConfigReview />}
                  members={() => <MembersReview />}
                  membership={() => <MembershipReview />}
                  tokenInfo={() => <TokenInfoReview />}
                  whitelist={() => <WhitelistReview />}
                  initialBalances={() => <InitialBalancesReview />}
                />
              </ReviewSection>
              <Line />
            </Fragment>
          );
        })}
      </VStack>
    </WizardStep>
  );
}
