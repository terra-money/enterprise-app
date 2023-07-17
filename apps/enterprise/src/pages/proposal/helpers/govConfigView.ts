import { fromChainAmount } from 'chain/utils/fromChainAmount';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { secondsInDay } from 'date-fns';
import { DAO } from 'types';
import { enterprise } from 'types/contracts';
import { toPercents } from 'lib/shared/utils/toPercents';
import { pluralize } from 'lib/shared/utils/pluralize';

export interface GovConfigView extends Record<string, string | undefined> {
  quorum: string;
  threshold: string;
  vetoThreshold: string;
  unlockingPeriod: string;
  votingDuration: string;
  minimumDeposit: string;
  allowEarlyProposalExecution?: string;
}

export const govConfigViewFieldNameRecord: Record<keyof GovConfigView, string> = {
  quorum: 'Quorum',
  threshold: 'Threshold',
  vetoThreshold: 'Veto threshold',
  unlockingPeriod: 'Unlocking period',
  votingDuration: 'Voting duration',
  minimumDeposit: 'Minimum deposit',
  allowEarlyProposalExecution: 'Allow early proposal execution',
};

const noValue = 'null';

const toDays = (seconds: number) => {
  const days = Math.round(Number(seconds) / secondsInDay);
  return pluralize(days, 'day');
};

const formatDuration = (value: enterprise.Duration | null | undefined) => {
  if (!value) {
    return 'Immediate';
  }

  if ('time' in value) {
    return toDays(value.time);
  }

  return pluralize(value.height, 'block');
};

const formatBoolean = (value: boolean | null | undefined) => (value ? 'Yes' : 'No');

export const getUpdatedFields = (
  msg: enterprise.UpdateGovConfigMsg,
  tokenDecimals: number = 6
): Partial<GovConfigView> => {
  const view: Partial<GovConfigView> = {};

  if (msg.minimum_deposit !== 'no_change') {
    const minimumDeposit = msg.minimum_deposit.change;
    view.minimumDeposit = minimumDeposit ? formatAmount(fromChainAmount(minimumDeposit, tokenDecimals)) : noValue;
  }

  if (msg.quorum !== 'no_change') {
    const quorum = msg.quorum.change;
    view.quorum = quorum ? toPercents(Number(quorum)) : noValue;
  }

  if (msg.threshold !== 'no_change') {
    const threshold = msg.threshold.change;
    view.threshold = threshold ? toPercents(Number(threshold)) : noValue;
  }

  if (msg.veto_threshold !== 'no_change') {
    const threshold = msg.veto_threshold.change;
    view.veto_threshold = threshold ? toPercents(Number(threshold)) : noValue;
  }

  if (msg.unlocking_period !== 'no_change') {
    const unlockingPeriod = msg.unlocking_period.change;
    view.unlockingPeriod = formatDuration(unlockingPeriod);
  }

  if (msg.voting_duration !== 'no_change') {
    const votingDuration = msg.voting_duration.change;
    view.votingDuration = votingDuration ? toDays(Number(votingDuration)) : noValue;
  }

  if (msg.allow_early_proposal_execution !== 'no_change') {
    view.allowEarlyProposalExecution = formatBoolean(msg.allow_early_proposal_execution.change);
  }

  return view;
};

export const fromDao = (dao: DAO, tokenDecimals: number = 6): GovConfigView => {
  const { governanceConfig } = dao;
  const { minimumDeposit } = governanceConfig;

  const result: GovConfigView = {
    quorum: toPercents(governanceConfig.quorum),
    threshold: toPercents(governanceConfig.threshold),
    vetoThreshold: toPercents(governanceConfig.vetoThreshold),
    unlockingPeriod: formatDuration(governanceConfig.unlockingPeriod),
    votingDuration: toDays(Number(governanceConfig.voteDuration)),
    minimumDeposit: minimumDeposit ? formatAmount(fromChainAmount(minimumDeposit, tokenDecimals)) : noValue,
  };

  if (dao.type === 'multisig') {
    result.allowEarlyProposalExecution = formatBoolean(governanceConfig.allowEarlyProposalExecution);
  }

  return result;
};
