import { getLast } from '@terra-money/apps/utils';
import { ConditionalRender } from 'components/primitives';
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
import { WizardLayout } from './WizardLayout';
import { CouncilStep } from './shared/CouncilStep';
import { useRefCallback } from '@terra-money/apps/hooks';
import { CompletedTransaction, useTransactionSubscribers } from '@terra-money/apps/libs/transactions';
import { reportError } from 'errors/errorMonitoring';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { PrimaryButton } from 'lib/ui/buttons/rect/PrimaryButton';
import { useState } from 'react';
import { WhitelistStep } from './WhitelistStep';

export const DaoWizard = () => {
  const navigate = useNavigate();

  const { formState, back, forward } = useDaoWizardForm();

  const { steps, predictedSteps, isValid } = formState;

  const [txResult, createDaoTx] = useCreateDAOTx();

  const [isFinishLoading, setIsFinishLoading] = useState(false);

  const onCompleted = useRefCallback(
    (transaction: CompletedTransaction) => {
      setIsFinishLoading(false);

      if (!txResult?.value) return;

      const { txhash } = txResult.value.result;
      if (txhash !== transaction.txHash) return;

      try {
        const address = transaction.logs[0].eventsByType.wasm.dao_address[0];
        navigate(`/dao/${address}`);
      } catch (error) {
        reportError(error, { msg: 'Failed to extract dao_address from transaction logs' });
      }
    },
    [txResult, setIsFinishLoading]
  );

  const onFailed = useRefCallback(() => {
    setIsFinishLoading(false);
  }, [setIsFinishLoading]);

  const onCancelled = useRefCallback(() => {
    setIsFinishLoading(false);
  }, [setIsFinishLoading]);

  useTransactionSubscribers({
    onCompleted,
    onFailed,
    onCancelled,
  });

  const isBackVisible = steps.length > 1;
  const isNextVisible = steps.length < predictedSteps.length;
  const isFinishVisible = steps.length === predictedSteps.length;

  const onFinish = async () => {
    try {
      setIsFinishLoading(true);
      await createDaoTx(toCreateDaoMsg(formState));
    } catch (error) {
      setIsFinishLoading(false);
      console.log(error);
    }
  };

  const percentageComplete = Math.trunc(((steps.length - 1) / predictedSteps.length) * 100);

  const step = getLast(steps);

  return (
    <WizardLayout
      percentageComplete={percentageComplete}
      footer={
        <SameWidthChildrenRow fullWidth gap={16} childrenWidth={140}>
          {isBackVisible && (
            <PrimaryButton kind="secondary" onClick={back}>
              Back
            </PrimaryButton>
          )}
          {isNextVisible && (
            <PrimaryButton onClick={forward} disabled={!isValid}>
              Next
            </PrimaryButton>
          )}
          {isFinishVisible && (
            <PrimaryButton onClick={onFinish} isLoading={isFinishLoading}>
              Finish
            </PrimaryButton>
          )}
        </SameWidthChildrenRow>
      }
    >
      <ConditionalRender
        value={step}
        type={() => <SelectDaoTypeStep />}
        daoImport={() => <ImportStep />}
        info={() => <InfoStep />}
        members={() => <MembersStep />}
        govConfig={() => <GovConfigStep />}
        council={() => <CouncilStep />}
        socials={() => <SocialsStep />}
        confirm={() => <ConfirmationStep isLoading={isFinishLoading} />}
        membership={() => <NftMembershipStep />}
        tokenInfo={() => <TokenInfoStep />}
        initialBalances={() => <InitialBalancesStep />}
        whitelist={() => <WhitelistStep />}
      />
    </WizardLayout>
  );
};
