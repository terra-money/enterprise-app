import { FormState } from '@terra-money/apps/hooks';
import { ThresholdInput } from 'pages/create-dao/gov-config/ThresholdInput';
import { QuorumInput } from 'pages/create-dao/gov-config/QuorumInput';
import { UnlockingPeriodInput } from 'pages/create-dao/gov-config/UnlockingPeriodInput';
import { VoteDurationInput } from './VoteDurationInput';
import { enterprise } from 'types/contracts';
import { MinimumDepositInput } from 'pages/create-dao/gov-config/MinimumDepositInput';
import { DaoGovConfigInput } from './DaoGovConfigInput';
// import { VetoThresholdInput } from './VetoThresholdInput';

interface ConfigProposalFormProps {
  onChange: (params: Partial<DaoGovConfigInput>) => void;
  value: FormState<DaoGovConfigInput>;
  daoType: enterprise.DaoType;
}

export const GovConfigFields = ({ value, onChange, daoType }: ConfigProposalFormProps) => {
  return (
    <>
      {daoType === 'token' && (
        <MinimumDepositInput
          value={value.minimumDeposit}
          onChange={(minimumDeposit) => onChange({ minimumDeposit })}
          error={value.minimumDepositError}
        />
      )}
      <VoteDurationInput value={value.voteDuration} onChange={(voteDuration) => onChange({ voteDuration })} />
      <QuorumInput value={value.quorum} onChange={(quorum) => onChange({ quorum })} />
      <ThresholdInput value={value.threshold} onChange={(threshold) => onChange({ threshold })} />
      {/* <VetoThresholdInput value={value.vetoThreshold} onChange={(vetoThreshold) => onChange({ vetoThreshold })} /> */}
      {daoType !== 'multisig' && (
        <UnlockingPeriodInput
          value={value.unlockingPeriod}
          error={value.unlockingPeriodError}
          onChange={(unlockingPeriod) => onChange({ unlockingPeriod })}
        />
      )}
    </>
  );
};
