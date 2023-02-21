import { getLast } from '@terra-money/apps/utils';
import { ConditionalRender } from 'components/primitives';
import { useMemo } from 'react';
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
import { useRefCallback } from '@terra-money/apps/hooks';
import { CompletedTransaction, useTransactionSubscribers } from '@terra-money/apps/libs/transactions';
import { reportError } from 'errors/errorMonitoring';

export const DaoWizard = () => {
  const navigate = useNavigate();

  const { formState, back, forward } = useDaoWizardForm();

  const { steps, predictedSteps, isValid } = formState;

  const [txResult, createDaoTx] = useCreateDAOTx();
  const onCompleted = useRefCallback(
    (transaction: CompletedTransaction) => {
      if (!txResult?.value) return;

      const { txhash } = txResult.value.result;
      if (txhash !== transaction.txHash) return;

      try {
        const address = transaction.logs[0].eventsByType.wasm.dao_address[0];
        navigate(`/dao/${address}`);
      } catch (error) {
        reportError(error, { msg: 'Fail to extract dao_address from transaction logs' });
      }
    },
    [txResult]
  );
  useTransactionSubscribers({
    onCompleted,
  });

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
