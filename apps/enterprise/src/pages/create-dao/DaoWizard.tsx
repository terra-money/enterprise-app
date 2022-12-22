import { getLast } from '@terra-money/apps/utils';
import { ConditionalRender } from 'components/primitives';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useCreateDAOTx } from 'tx';
import { useDaoWizardForm } from './DaoWizardFormProvider';
import { toCreateDaoMsg } from './helpers/toCreateDaoMsg';
import { MembersStep } from './multisig/MembersStep';
import { NftMembershipStep } from './nft/NftMembershipStep';
import { SelectDaoTypeStep } from './SelectDaoTypeStep';
import { ConfirmationStep } from './shared/ConfirmationStep';
import { GovConfigStep } from './gov-config/GovConfigStep';
import { ImportStep } from './shared/ImportStep';
import { InfoStep } from './shared/InfoStep';
import { SocialsStep } from './shared/SocialsStep';
import { InitialBalancesStep } from './token/InitialBalancesStep';
import { TokenInfoStep } from './token/TokenInfoStep';
import { TokenMarketingStep } from './token/TokenMarketingStep';
import { WizardButtons, WizardButtonsProps } from './WizardButtons';
import { WizardLayout } from './WizardLayout';
import { CouncilStep } from './shared/CouncilStep';

export const DaoWizard = () => {
  const navigate = useNavigate();

  const { formState, back, forward } = useDaoWizardForm();

  const { steps, predictedSteps, isValid } = formState;

  const [txResult, createDaoTx] = useCreateDAOTx();
  useEffect(() => {
    if (txResult.value) {
      navigate('/dashboard');
    }
  }, [navigate, txResult.value]);

  const buttonProps: WizardButtonsProps = useMemo(() => {
    return {
      backVisible: steps.length > 1,
      backDisabled: false,
      onBack: back,

      nextVisible: steps.length < predictedSteps.length,
      nextDisabled: !isValid,
      onNext: forward,

      finishVisible: steps.length === predictedSteps.length,
      finishDisabled: false,
      onFinish: async () => {
        try {
          await createDaoTx(toCreateDaoMsg(formState));
        } catch (error) {
          console.log(error);
        }
      },
    };
  }, [back, createDaoTx, formState, forward, isValid, predictedSteps.length, steps.length]);

  const percentageComplete = Math.trunc(((steps.length - 1) / predictedSteps.length) * 100);

  const step = getLast(steps);

  return (
    <WizardLayout percentageComplete={percentageComplete} footer={<WizardButtons {...buttonProps} />}>
      <ConditionalRender
        value={step}
        type={() => <SelectDaoTypeStep />}
        daoImport={() => <ImportStep />}
        info={() => <InfoStep />}
        members={() => <MembersStep />}
        govConfig={() => <GovConfigStep />}
        council={() => <CouncilStep />}
        socials={() => <SocialsStep />}
        confirm={() => <ConfirmationStep pending={txResult.loading} />}
        membership={() => <NftMembershipStep />}
        tokenMarketing={() => <TokenMarketingStep />}
        tokenInfo={() => <TokenInfoStep />}
        initialBalances={() => <InitialBalancesStep />}
      />
    </WizardLayout>
  );
};
