import { ConfigProposalFormState } from '../useCreateConfigProposalForm';
import { enterprise } from 'types/contracts';
import { toChainAmount } from 'chain/utils/toChainAmount';
import { DAO } from 'types';
import { getDaoRatio } from 'pages/create-dao/helpers/toCreateDaoMsg';

export const toUpdateGovConfigMsg = (
  dao: DAO,
  {
    quorum,
    threshold,
    vetoThreshold,
    unlockingPeriod,
    voteDuration,
    minimumDeposit,
    timeConversionFactor,
  }: ConfigProposalFormState,
  tokenDecimals?: number
): enterprise.UpdateGovConfigMsg => {
  const msg: enterprise.UpdateGovConfigMsg = {
    minimum_deposit: 'no_change',
    quorum: 'no_change',
    threshold: 'no_change',
    veto_threshold: 'no_change',
    unlocking_period: 'no_change',
    voting_duration: 'no_change',
    allow_early_proposal_execution: 'no_change',
  };

  if (minimumDeposit) {
    const newMinimumDeposit = toChainAmount(minimumDeposit, tokenDecimals || 6);
    if (dao.governanceConfig.minimumDeposit !== newMinimumDeposit) {
      msg.minimum_deposit = { change: newMinimumDeposit };
    }
  }

  const newQuorum = getDaoRatio(quorum);
  const oldQuorum = getDaoRatio(dao.governanceConfig.quorum);
  if (newQuorum !== oldQuorum) {
    msg.quorum = { change: newQuorum };
  }

  const newThreshold = getDaoRatio(threshold);
  const oldThreshold = getDaoRatio(dao.governanceConfig.threshold);
  if (newThreshold !== oldThreshold) {
    msg.threshold = { change: newThreshold };
  }

  const newVetoThreshold = getDaoRatio(vetoThreshold);
  const oldVetoThreshold = getDaoRatio(dao.governanceConfig.vetoThreshold);
  if (oldVetoThreshold !== newVetoThreshold) {
    msg.veto_threshold = { change: newVetoThreshold };
  }

  const newUnlockingPeriod = unlockingPeriod * timeConversionFactor;
  if (
    !('time' in dao.governanceConfig.unlockingPeriod) ||
    newUnlockingPeriod !== dao.governanceConfig.unlockingPeriod.time
  ) {
    msg.unlocking_period = { change: { time: newUnlockingPeriod } };
  }

  const newVotingDuration = voteDuration * timeConversionFactor;
  if (newVotingDuration !== dao.governanceConfig.voteDuration) {
    msg.voting_duration = { change: newVotingDuration.toString() };
  }

  return msg;
};
