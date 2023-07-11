import { ThresholdInput } from 'pages/create-dao/gov-config/ThresholdInput';
import { QuorumInput } from 'pages/create-dao/gov-config/QuorumInput';
import { UnlockingPeriodInput } from 'pages/create-dao/gov-config/UnlockingPeriodInput';
import { VoteDurationInput } from './VoteDurationInput';
import { enterprise } from 'types/contracts';
import { MinimumDepositInput } from 'pages/create-dao/gov-config/MinimumDepositInput';
import { DaoGovConfigInput } from './DaoGovConfigInput';
import { VetoThresholdInput } from './VetoThresholdInput';
import { Checkbox } from 'lib/ui/inputs/Checkbox/Checkbox';
import { HStack } from 'lib/ui/Stack';
import { Tooltip } from 'lib/ui/Tooltip';
import { Text } from 'lib/ui/Text';
import { HelpCircleIcon } from 'lib/ui/icons/HelpCircleIcon';
import { FormState } from 'lib/shared/hooks/useForm';

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
      <VoteDurationInput
        value={value.voteDuration}
        error={value.voteDurationError}
        onChange={(voteDuration) => onChange({ voteDuration })}
      />
      <QuorumInput error={value.quorumError} value={value.quorum} onChange={(quorum) => onChange({ quorum })} />
      <ThresholdInput
        error={value.thresholdError}
        value={value.threshold}
        onChange={(threshold) => onChange({ threshold })}
      />
      <VetoThresholdInput
        error={value.vetoThresholdError}
        value={value.vetoThreshold}
        onChange={(vetoThreshold) => onChange({ vetoThreshold })}
      />
      {daoType !== 'multisig' && (
        <UnlockingPeriodInput
          value={value.unlockingPeriod}
          error={value.unlockingPeriodError}
          onChange={(unlockingPeriod) => onChange({ unlockingPeriod })}
        />
      )}
      {daoType === 'multisig' && (
        <HStack alignItems="center">
          <Checkbox
            label="Allow early proposal execution"
            value={!!value.allowEarlyProposalExecution}
            onChange={(allowEarlyProposalExecution) => onChange({ allowEarlyProposalExecution })}
          />
          <Tooltip
            content={
              <Text style={{ maxWidth: 320 }}>
                Allows your DAO to execute proposals as soon as they reach quorum and threshold, without having to wait
                until the end of the voting period.
              </Text>
            }
            renderOpener={(props) => (
              <div {...props}>
                <HelpCircleIcon />
              </div>
            )}
          />
        </HStack>
      )}
    </>
  );
};
